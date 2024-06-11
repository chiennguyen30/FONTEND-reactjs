import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManagePatient.scss";
import { getListPatientForDoctor, postSendRemedy } from "../../../services/userServices";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
// Tạo hàm để chuẩn hóa thời gian về đầu ngày (00:00:00)

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).add(0, "days").startOf("day").valueOf(),
      dataPatient: [],
      isOpenModalRemedy: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {
    this.getDatePatient();
  }

  getDatePatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getListPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {}

  // Hàm xử lý khi chọn ngày từ DatePicker component
  handleOnchangeDatepicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDatePatient();
      }
    );
  };

  handleBtnConfirm = (item) => {
    console.log("check data: ", item);
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenModalRemedy: true,
      dataModal: data,
    });
  };
  isCloseModalRemedy = () => {
    this.setState({
      isOpenModalRemedy: !this.state.isOpenModalRemedy,
      dataModal: {},
    });
  };
  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("send remedy success!!!");
      this.isCloseModalRemedy();
      await this.getDatePatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Something wrong, please try again!!!");
    }
  };
  render() {
    let { dataPatient, isOpenModalRemedy, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading...">
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label htmlFor="">Choose a date</label>
                <DatePicker
                  onChange={this.handleOnchangeDatepicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Giới tính</th>
                      <th>Action</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0
                      ? dataPatient.map((item, index) => {
                          let time =
                            language === LANGUAGES.VI
                              ? item.timeTypeDataPatient.valueVi
                              : item.timeTypeDataPatient.valueEn;
                          let gender =
                            language === LANGUAGES.VI
                              ? item.patientData.genderData.valueVi
                              : item.patientData.genderData.valueEn;
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{time}</td>
                              <td>{item.patientData.firstName}</td>
                              <td>{item.patientData.address}</td>
                              <td>{gender}</td>
                              <td>
                                <button
                                  className="btn-success btn-actions"
                                  onClick={() => this.handleBtnConfirm(item)}
                                >
                                  Xác nhận
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : "no data"}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenModalRemedy}
            data={dataModal}
            isCloseModal={this.isCloseModalRemedy}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
