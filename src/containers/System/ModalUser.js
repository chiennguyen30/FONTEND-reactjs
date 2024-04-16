import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  toggle = () => {
    this.props.close();
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
            Create a new user
          </ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input type="text" name="Email" />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input type="password" name="Password" />
              </div>
              <div className="input-container">
                <label>First name</label>
                <input type="text" name="firstName" />
              </div>
              <div className="input-container">
                <label>Last name</label>
                <input type="text" name="lastName" />
              </div>
              <div className="input-container max-width-input">
                <label>Address</label>
                <input type="text" name="Address" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              toggle={() => {
                this.toggle();
              }}
            >
              Save
            </Button>{" "}
            <Button
              color="secondary"
              className="px-3"
              toggle={() => {
                this.toggle();
              }}
            >
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
