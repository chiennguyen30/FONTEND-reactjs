import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../../utils";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
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
    console.log("check data : ", data);
    return (
      <>
        <Modal
          isOpen={isOpenModal}
          className="booking-modal-container"
          size="lg"
          fullscreen="sm"
          centered
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">Thông tin đặt lịch khám bệnh</span>
              <span className="right" onClick={isCloseModal}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body ">
              <div className="doctor-infor"></div>
              <div className="price">gia kham 500000</div>
              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor="">ho va ten</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">so dien thoai</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">dia chi email</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">dia chi lien he</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="">ly do kham</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">dat cho ai</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">gioi tinh</label>
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
