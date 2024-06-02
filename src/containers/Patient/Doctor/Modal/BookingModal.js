import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../../utils";
import * as actions from "../../../../store/actions";
import DatePicker from "../../../../components/Input/DatePicker";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import Select from "react-select";
import { postPatientBookingAppoinMent } from "../../../../services/userServices";
import { toast } from "react-toastify";
import moment from "moment";
class BookingModal extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      birthday: "",
      doctorId: "",
      reason: "",
      selectedGender: "",
      genders: "",
      timeType: "",
    };
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {
    this.props.getGenders();
  }

  builDataGender = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        let language = this.props.language;
        object.label = language === LANGUAGES.VI ? item.valueVI : item.valueEN;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        genders: this.builDataGender(this.props.genders),
      });
    }
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        genders: this.builDataGender(this.props.genders),
      });
    }
    if (this.props.data !== prevProps.data) {
      if (this.props.data && !_.isEmpty(this.props.data)) {
        console.log("check data time : ", this.props.data);
        let doctorId = this.props.data.doctorId;
        let timeType = this.props.data.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }
  handleOnchangeInput = (e, id) => {
    let valueInput = e.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnchangeDatepicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleChangeSelect = (selectedGender) => {
    this.setState({ selectedGender });
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        dataTime.timeTypeData && language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return `${time} - ${date}`;
    }
    return "";
  };

  buildDoctorName = (data) => {
    console.log(data);
    let { language } = this.props;
    if (data && !_.isEmpty(data)) {
      let name =
        language === LANGUAGES.VI
          ? `${data.doctorData.firstName} ${data.doctorData.LastName}`
          : `${data.doctorData.LastName} ${data.doctorData.firstName}`;
      return name;
    }
    return "";
  };

  handleSaveBooking = async () => {
    //validate input
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.data);
    let doctorName = this.buildDoctorName(this.props.data);
    let res = await postPatientBookingAppoinMent({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      date: date,
      doctorId: this.state.doctorId,
      reason: this.state.reason,
      selectedGender: this.state.selectedGender.value,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment succeed!!!");
      this.props.isCloseModal();
    } else {
      toast.error("Booking a new appointment failure!!!");
    }
  };
  render() {
    let { isOpenModal, isCloseModal, data } = this.props;
    let { fullName, phoneNumber, email, address, birthday, selectedGender, reason } = this.state;
    let doctorId = data && !_.isEmpty(data) ? data.doctorId : "";
    return (
      <>
        <Modal
          isOpen={isOpenModal}
          className="booking-modal-container"
          toggle={isCloseModal}
          size="xl"
          fullscreen="sm"
          centered
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">
                <FormattedMessage id="patient.booking-modal.title" />
              </span>
              <span className="right" onClick={isCloseModal}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body ">
              <div className="doctor-infor">
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowDescriptionDoctor={false}
                  dataTime={data}
                />
              </div>

              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    onChange={(e) => this.handleOnchangeInput(e, "fullName")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.phone-number" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => this.handleOnchangeInput(e, "phoneNumber")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.email" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => this.handleOnchangeInput(e, "email")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => this.handleOnchangeInput(e, "address")}
                  />
                </div>
                <div className="col-12 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.reason" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={reason}
                    onChange={(e) => this.handleOnchangeInput(e, "reason")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.birthday" />
                  </label>
                  <DatePicker
                    onChange={this.handleOnchangeDatepicker}
                    className="form-control"
                    value={birthday}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.gender" />
                  </label>
                  <Select
                    value={selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button className="btn btn-warning" onClick={() => this.handleSaveBooking()}>
                <FormattedMessage id="patient.booking-modal.confirm" />
              </button>
              <button className="btn btn-danger" onClick={isCloseModal}>
                <FormattedMessage id="patient.booking-modal.cancel" />
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
