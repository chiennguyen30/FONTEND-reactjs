import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userServices";
import NumberFormat from "react-number-format";
class ProfileDoctor extends Component {
  constructor() {
    super();
    this.state = {
      dataProfile: {},
    };
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      // this.getInforDoctor(this.props.doctorId);
    }
  }

  render() {
    let { language, isShowDescriptionDoctor } = this.props;
    let { dataProfile } = this.state;
    let nameVi = "";
    let nameEn = "";

    if (dataProfile?.positionData) {
      const { valueVi, valueEn } = dataProfile.positionData;
      const { firstName, lastName } = dataProfile;

      nameVi = `${valueVi}, ${lastName} ${firstName}`;
      nameEn = `${valueEn}, ${firstName} ${lastName}`;
    }
    console.log("state : ", this.state);

    return (
      <>
        <div className="profile-doctor-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                background: `url(${
                  dataProfile && dataProfile.image
                }) center center/cover no-repeat `,
              }}
            ></div>
            <div className="content-right">
              <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
              <div className="down">
                {isShowDescriptionDoctor === true && (
                  <>
                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div>{dataProfile && language === LANGUAGES.VI ? dataProfile.address : ""}</div>
          <div className="price">
            Giá khám :{" "}
            {
              dataProfile &&
                dataProfile.Doctor_Infor &&
                (language === LANGUAGES.VI ? (
                  <NumberFormat
                    className="currency"
                    value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                    displayType="text"
                    thousandSeparator={true}
                    suffix={" VNĐ"}
                  />
                ) : language === LANGUAGES.EN ? (
                  <NumberFormat
                    className="currency"
                    value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                    displayType="text"
                    thousandSeparator={true}
                    suffix={"$"}
                  />
                ) : null) // Có thể thêm điều kiện xử lý khác nếu cần
            }
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
