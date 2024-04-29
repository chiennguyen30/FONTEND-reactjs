import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Khởi tạo state ban đầu
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImage: "",
      isOpen: false,

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
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
      });
    }

    // Kiểm tra nếu danh sách positions từ Redux store đã thay đổi, cập nhật state
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: this.props.positionRedux,
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : "",
      });
    }

    // Kiểm tra nếu danh sách roles từ Redux store đã thay đổi, cập nhật state
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
      });
    }
  }
  handleOnchangeImg = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImage: objectUrl,
        avatar: file,
      });
    }
  };

  openPreviewImg = () => {
    this.setState({ isOpen: true });
  };
  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  validateForm = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "phoneNumber", "address"];

    // Cụm từ thông dụng cho email, mật khẩu (ít nhất 6 ký tự) và số điện thoại (chính xác 10 chữ số)
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    const phoneNumberRegex = /^\d{10}$/;

    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }

      // Kiểm tra xem người dùng nhập có nhập đúng trường email hay chưa
      if (arrInput[i] === "email" && !emailRegex.test(this.state.email)) {
        isValid = false;
        alert("Invalid email format");
        break;
      }
      // Kiểm tra xem người dùng nhập có nhập đủ số ký tự của mk hay chưa
      if (arrInput[i] === "password" && !passwordRegex.test(this.state.password)) {
        isValid = false;
        alert("Password must be at least 6 characters long and uppercase letters");
        break;
      }

      if (arrInput[i] === "phoneNumber" && !phoneNumberRegex.test(this.state.phoneNumber)) {
        isValid = false;
        alert("Phone number must be exactly 10 digits");
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.validateForm();
    if (isValid === false) return;

    // fire redux action
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
    });
    alert("User created successfully!");
    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      role: "", // Đặt lại các giá trị khác nếu cần
      position: "",
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
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    this.onChangeInput(e, "email");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    this.onChangeInput(e, "password");
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
                    this.onChangeInput(e, "firstName");
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
                    this.onChangeInput(e, "lastName");
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
                    this.onChangeInput(e, "phoneNumber");
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
                    this.onChangeInput(e, "address");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "gender");
                  }}
                >
                  {/* Render danh sách genders */}
                  {genderArr &&
                    genderArr.map((item, index) => (
                      <option key={index} value={item.key}>
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
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "position");
                  }}
                >
                  {/* Render danh sách positions */}
                  {positionArr &&
                    positionArr.map((item, index) => (
                      <option key={index} value={item.key}>
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
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "role");
                  }}
                >
                  {/* Render danh sách roles */}
                  {roleArr &&
                    roleArr.map((item, index) => (
                      <option key={index} value={item.key}>
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
                <button className="btn btn-primary my-3" onClick={() => this.handleSaveUser()}>
                  <FormattedMessage id="manage-user.save" />
                </button>
              </div>
              {/* Other form elements */}
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
});

// Dispatch các action để lấy dữ liệu từ Redux store và map vào props của component
const mapDispatchToProps = (dispatch) => ({
  getGenderList: () => dispatch(actions.fetchGenderStart()),
  getPositionList: () => dispatch(actions.fetchPositionStart()),
  getRoleList: () => dispatch(actions.fetchRoleStart()),
  createNewUser: (data) => dispatch(actions.createNewUser(data)),
});

// Kết nối component với Redux store
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
