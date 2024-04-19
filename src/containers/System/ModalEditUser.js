import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  // Hàm được gọi khi component đã được render
  componentDidMount() {
    let dataUser = this.props.dataUserEdit;
    if (dataUser && !_.isEmpty(dataUser)) {
      this.setState({
        id: dataUser.id,
        email: dataUser.email,
        password: "dasd",
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        address: dataUser.address,
      });
    }
  }

  // Hàm để đóng modal
  toggle = () => {
    this.props.close();
  };

  // Hàm xử lý khi giá trị của input thay đổi
  handleOnChangeInput = (event, id) => {
    const copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };

  // Hàm kiểm tra tính hợp lệ của dữ liệu nhập vào
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter : " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  // Hàm xử lý khi click vào nút thêm người dùng
  handleEditUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api
      this.props.EditUser(this.state);
    }
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => {
            this.toggle();
          }}
          className="modal-user-container"
          size="lg"
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            Edit a new user
          </ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="email"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                  disabled
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangeInput(event, "password")}
                  disabled
                />
              </div>
              <div className="input-container">
                <label>First name</label>
                <input
                  type="text"
                  value={this.state.firstName}
                  onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                />
              </div>
              <div className="input-container">
                <label>Last name</label>
                <input
                  type="text"
                  value={this.state.lastName}
                  onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                />
              </div>
              <div className="input-container max-width-input">
                <label>Address</label>
                <input
                  type="text"
                  value={this.state.address}
                  onChange={(event) => this.handleOnChangeInput(event, "address")}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="px-3" onClick={() => this.handleEditUser()}>
              Save
            </Button>{" "}
            <Button color="secondary" className="px-3" onClick={() => this.toggle()}>
              close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
