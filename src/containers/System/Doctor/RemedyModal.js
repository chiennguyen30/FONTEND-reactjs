import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./RemedyModal.scss";

import _ from "lodash";
import { CommonUtils } from "../../../utils";

class RemedyModal extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {
    if (this.props.data) {
      this.setState({
        email: this.props.data.email,
      });
    }
  }

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        email: this.props.data.email,
      });
    }
  }

  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnchangeImg = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { isOpenModal, isCloseModal, data } = this.props;

    return (
      <>
        <Modal
          isOpen={isOpenModal}
          className="booking-modal-container"
          toggle={isCloseModal}
          size="lg"
          fullscreen="sm"
          centered
        >
          <ModalHeader toggle={isCloseModal}>Gửi hóa đơn khám bệnh</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="">Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  onChange={(event) => this.handleOnchangeEmail(event)}
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">Chọn file đơn thuốc</label>
                <input
                  className="form-control-flie"
                  type="file"
                  onChange={(e) => this.handleOnchangeImg(e)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSendRemedy()}>
              Gửi đơn
            </Button>{" "}
            <Button color="secondary" onClick={isCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
