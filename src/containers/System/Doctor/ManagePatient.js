import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManagePatient.scss";
import { getListPatientForDoctor } from "../../../services/userServices";
import moment from "moment";
// Tạo hàm để chuẩn hóa thời gian về đầu ngày (00:00:00)

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).add(0, "days").startOf("day").valueOf(),
      dataPatient: [],
    };
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    this.getDatePatient(user, formatedDate);
  }

  getDatePatient = async (user, formatedDate) => {
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
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDatePatient(user, formatedDate);
      }
    );
  };

  handleBtnConfirm = () => {};
  handleBtnRemedy = () => {};
  render() {
    let { dataPatient } = this.state;
    return (
      <>
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
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.timeTypeDataPatient.valueVi}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>{item.patientData.genderData.valueVi}</td>
                            <td>
                              <button
                                className="btn-success btn-actions"
                                onClick={() => this.handleBtnConfirm()}
                              >
                                Xác nhận
                              </button>
                              <button
                                className="btn-warning btn-actions"
                                onClick={() => this.handleBtnRemedy()}
                              >
                                Gửi hóa đơn
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
