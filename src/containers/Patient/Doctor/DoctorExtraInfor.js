import React, { Component } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import "./DoctorExtraInfor.scss";
import { getExtraDoctorInforById } from "../../../services/userServices";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
class DoctorExtraInfor extends Component {
  constructor() {
    super();
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {}

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
    }
    // Nếu doctorIdFormParent thay đổi
    if (this.props.doctorIdFormParent !== prevProps.doctorIdFormParent) {
      let res = await getExtraDoctorInforById(this.props.doctorIdFormParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }
  handleIsShowDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { language } = this.props;
    let { isShowDetailInfor, extraInfor } = this.state;
    console.log("check doctor infor : ", extraInfor);
    return (
      <>
        <div className="doctor-extra-infor-container">
          <div className="content-up">
            <div className="text-address text-uppercase">
              <FormattedMessage id="patient.extra-infor-doctor.text-address" />
            </div>
            <div className="name-clinic">
              {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
            </div>
            <div className="detail-address">
              {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ""}
            </div>
          </div>
          <div className="content-down">
            {isShowDetailInfor === false ? (
              <div className="short-infor">
                <FormattedMessage id="patient.extra-infor-doctor.EXAMINATION-PRICE" />{" "}
                {
                  extraInfor &&
                    extraInfor.priceTypeData &&
                    (language === LANGUAGES.VI ? (
                      <NumberFormat
                        className="currency"
                        value={extraInfor.priceTypeData.valueVi}
                        displayType="text"
                        thousandSeparator={true}
                        suffix={"VND"}
                      />
                    ) : language === LANGUAGES.EN ? (
                      <NumberFormat
                        className="currency"
                        value={extraInfor.priceTypeData.valueEn}
                        displayType="text"
                        thousandSeparator={true}
                        suffix={"$"}
                      />
                    ) : null) // Có thể thêm điều kiện xử lý khác nếu cần
                }
                <span className="detail-span" onClick={() => this.handleIsShowDetailInfor(true)}>
                  <FormattedMessage id="patient.extra-infor-doctor.See-details" />
                </span>
              </div>
            ) : (
              <>
                <div className="title-price text-uppercase">
                  <FormattedMessage id="patient.extra-infor-doctor.EXAMINATION-PRICE" />{" "}
                </div>
                <div className="detail-infor">
                  <div className="price">
                    <span className="left">
                      <FormattedMessage id="patient.extra-infor-doctor.EXAMINATION-PRICE" />
                    </span>
                    <span className="right">
                      {
                        extraInfor &&
                          extraInfor.priceTypeData &&
                          (language === LANGUAGES.VI ? (
                            <NumberFormat
                              className="currency"
                              value={extraInfor.priceTypeData.valueVi}
                              displayType="text"
                              thousandSeparator={true}
                              suffix={"VND"}
                            />
                          ) : language === LANGUAGES.EN ? (
                            <NumberFormat
                              className="currency"
                              value={extraInfor.priceTypeData.valueEn}
                              displayType="text"
                              thousandSeparator={true}
                              suffix={"$"}
                            />
                          ) : null) // Có thể thêm điều kiện xử lý khác nếu cần
                      }
                    </span>
                  </div>
                  <div className="note">{extraInfor && extraInfor.note ? extraInfor.note : ""}</div>
                </div>
                <div className="payment">
                  <FormattedMessage id="patient.extra-infor-doctor.payment-methods" /> :{" "}
                  {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                    ? extraInfor.paymentTypeData.valueVi
                    : extraInfor.paymentTypeData.valueEn}
                </div>
                <div className="hide-price">
                  <span onClick={() => this.handleIsShowDetailInfor(false)}>
                    <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                  </span>
                </div>
              </>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
