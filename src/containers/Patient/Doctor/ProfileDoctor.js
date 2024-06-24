import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { Link } from "react-router-dom";
import { getProfileDoctorById } from "../../../services/userServices";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
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
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        dataTime.timeTypeData && language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVI
          : dataTime.timeTypeData.valueEN;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.priceBooking" />
          </div>
        </>
      );
    }
  };
  render() {
    let {
      language,
      isShowDescriptionDoctor,
      dataTime,
      isShowPrice,
      isShowLinkDetail,
      doctorId,
      isShowCity,
    } = this.props;

    let { dataProfile } = this.state;
    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVI}, ${
        dataProfile.lastName + " " + dataProfile.firstName
      }`;
      nameEn = `${dataProfile.positionData.valueEN}, ${
        dataProfile.firstName + " " + dataProfile.lastName
      }`;
    }

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
                {isShowDescriptionDoctor === true ? (
                  <>
                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                  </>
                ) : (
                  <>{this.renderTimeBooking(dataTime)}</>
                )}
                {isShowCity === true && (
                  <div>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                    {dataProfile &&
                      dataProfile.Doctor_Infor &&
                      dataProfile.Doctor_Infor.provinceTypeData &&
                      (language === LANGUAGES.VI
                        ? dataProfile.Doctor_Infor.provinceTypeData.valueVI
                        : dataProfile.Doctor_Infor.provinceTypeData.valueEN)}
                  </div>
                )}
              </div>
            </div>
          </div>
          {isShowLinkDetail === true ? (
            <div className="view-detail-doctor">
              <Link to={`/detail-doctor/${doctorId}`}>Xem chi tiết</Link>
            </div>
          ) : (
            ""
          )}
          {isShowPrice === true && (
            <div className="price">
              <FormattedMessage id="patient.booking-modal.price" /> :{" "}
              {
                dataProfile &&
                  dataProfile.Doctor_Infor &&
                  (language === LANGUAGES.VI ? (
                    <NumberFormat
                      className="currency"
                      value={dataProfile.Doctor_Infor.priceTypeData.valueVI}
                      displayType="text"
                      thousandSeparator={true}
                      suffix={" VNĐ"}
                    />
                  ) : language === LANGUAGES.EN ? (
                    <NumberFormat
                      className="currency"
                      value={dataProfile.Doctor_Infor.priceTypeData.valueEN}
                      displayType="text"
                      thousandSeparator={true}
                      suffix={"$"}
                    />
                  ) : null) // Có thể thêm điều kiện xử lý khác nếu cần
              }
            </div>
          )}
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
