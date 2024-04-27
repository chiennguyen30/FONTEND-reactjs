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
      // Khởi tạo state ban đầu cho genderArr, positionArr, roleArr
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImage: "",
      isOpen: false,
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
      this.setState({ genderArr: this.props.genderRedux });
    }

    // Kiểm tra nếu danh sách positions từ Redux store đã thay đổi, cập nhật state
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({ positionArr: this.props.positionRedux });
    }

    // Kiểm tra nếu danh sách roles từ Redux store đã thay đổi, cập nhật state
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({ roleArr: this.props.roleRedux });
    }
  }
  handleOnchangeImg = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImage: objectUrl,
      });
    }
  };

  openPreviewImg = () => {
    // if (!this.state.previewImage) return;
    this.setState({ isOpen: true });
  };

  render() {
    // Lấy thông tin từ state và props để sử dụng trong render
    const { genderArr, positionArr, roleArr } = this.state;
    const { language } = this.props;

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
                <input type="email" className="form-control" name="email" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input type="password" className="form-control" name="password" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input type="text" className="form-control" name="firstName" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input type="text" className="form-control" name="lastName" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input type="text" className="form-control" name="phoneNumber" />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input type="text" className="form-control" name="address" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select className="form-control">
                  {/* Render danh sách genders */}
                  {genderArr &&
                    genderArr.map((item, index) => (
                      <option key={index}>
                        {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select className="form-control">
                  {/* Render danh sách positions */}
                  {positionArr &&
                    positionArr.map((item, index) => (
                      <option key={index}>
                        {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select className="form-control">
                  {/* Render danh sách roles */}
                  {roleArr &&
                    roleArr.map((item, index) => (
                      <option key={index}>
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
                <button className="btn btn-primary my-3">
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
});

// Kết nối component với Redux store
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
