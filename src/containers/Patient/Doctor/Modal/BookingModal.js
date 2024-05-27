import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../../utils";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";

class BookingModal extends Component {
  constructor() {
    super();
    this.state = {};
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {}

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {}

  render() {
    let { language, isOpenModal, isCloseModal, data } = this.props;
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
                <FormattedMessage id="admin.schedule-examination.title" />
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
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="admin.schedule-examination.name" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="admin.schedule-examination.phone-number" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="admin.schedule-examination.email" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="admin.schedule-examination.address" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="admin.schedule-examination.medical-examination" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="admin.schedule-examination.set" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="admin.schedule-examination.gender" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button className="btn btn-warning">Đặt lịch</button>
              <button className="btn btn-danger">Hủy bỏ</button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
