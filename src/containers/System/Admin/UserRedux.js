import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Khởi tạo state ban đầu
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImage: "",
      isOpen: false,
      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    // Gọi các hàm action để lấy danh sách genders, positions, roles từ Redux store
    this.props.getGenderList();
    this.props.getPositionList();
    this.props.getRoleList();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Kiểm tra nếu danh sách genders từ Redux store đã thay đổi, cập nhật state
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }

    // Kiểm tra nếu danh sách positions từ Redux store đã thay đổi, cập nhật state
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: this.props.positionRedux,
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }

    // Kiểm tra nếu danh sách roles từ Redux store đã thay đổi, cập nhật state
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrPositions = this.props.positionRedux;
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      this.setState(
        {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
          position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
          role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
          avatar: "",
          previewImage: "",
          action: CRUD_ACTIONS.CREATE,
        },
        () => {
          console.log("callback check state: ", this.state);
        }
      );
    }
  }
  handleOnchangeImg = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImage: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImg = () => {
    this.setState({ isOpen: true });
  };
  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  validateForm = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "phoneNumber", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.validateForm();
    if (isValid === false) return;
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      // fire redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      // fire redux edit user
      this.props.editAUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };
  handleEditUserFormParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "hardcode",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      previewImage: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };
  render() {
    // Lấy thông tin từ state và props để sử dụng trong render
    const { genderArr, positionArr, roleArr } = this.state;
    const { language } = this.props;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      avatar,
      gender,
      position,
      role,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">Learn react-redux chien IT</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              {/* Form elements */}
              <div className="col-12 my-3">
                <b>
                  {" "}
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit-user" />
                  ) : (
                    <FormattedMessage id="manage-user.add-user" />
                  )}
                </b>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  disabled={this.state.action === CRUD_ACTIONS.EDIT}
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "email");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  disabled={this.state.action === CRUD_ACTIONS.EDIT}
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "password");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "firstName");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "lastName");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "address");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  value={gender}
                  className="form-control"
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "gender");
                  }}
                >
                  {/* Render danh sách genders */}
                  {genderArr &&
                    genderArr.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  value={position}
                  className="form-control"
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "position");
                  }}
                >
                  {/* Render danh sách positions */}
                  {positionArr &&
                    positionArr.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  value={role}
                  className="form-control"
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "role");
                  }}
                >
                  {/* Render danh sách roles */}
                  {roleArr &&
                    roleArr.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    type="file"
                    id="previewImg"
                    hidden
                    onChange={(e) => this.handleOnchangeImg(e)}
                  />
                  <label htmlFor="previewImg" className="label-upload">
                    up file <i className="fas fa-upload"></i>
                  </label>
                  {/* Kiểm tra nếu previewImage có giá trị thì hiển thị hình ảnh, ngược lại ẩn đi */}
                  {this.state.previewImage && (
                    <div
                      className="preview-img"
                      style={{
                        background: `url(${this.state.previewImage}) center center/cover no-repeat`,
                        backgroundSize: "contain",
                      }}
                      onClick={() => this.openPreviewImg()}
                    ></div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning my-3"
                      : "btn btn-primary my-3"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFormParent={this.handleEditUserFormParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImage}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

// Lấy dữ liệu từ Redux store và map vào props của component
const mapStateToProps = (state) => ({
  language: state.app.language,
  genderRedux: state.admin.genders,
  roleRedux: state.admin.roles,
  positionRedux: state.admin.positions,
  listUsers: state.admin.users,
});

// Dispatch các action để lấy dữ liệu từ Redux store và map vào props của component
const mapDispatchToProps = (dispatch) => ({
  getGenderList: () => dispatch(actions.fetchGenderStart()),
  getPositionList: () => dispatch(actions.fetchPositionStart()),
  getRoleList: () => dispatch(actions.fetchRoleStart()),
  createNewUser: (data) => dispatch(actions.createNewUser(data)),
  fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
  editAUserRedux: (data) => dispatch(actions.editAUser(data)),
});

// Kết nối component với Redux store
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
