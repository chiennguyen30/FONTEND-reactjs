import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import logoHotpital from "../../assets/images/161905-iconkham-chuyen-khoa.png";
import logoTongQuan from "../../assets/images/161350-iconkham-tong-quan.png";
import logoTinhThan from "../../assets/images/161403-iconsuc-khoe-tinh-than.png";
import logoTuXa from "../../assets/images/161817-iconkham-tu-xa.png";
import logoYhoc from "../../assets/images/161340-iconxet-nghiem-y-hoc.png";
import logoNhaKhoa from "../../assets/images/161410-iconkham-nha-khoa.png";

class HomeHeader extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.speciality" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.DoctorsSpecialty" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.health-facility" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.Choose-hospital" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.fee" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.General-health-check" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="home-header.support" />
              </div>
              <div className="language-vn">VN</div>
              <span class="language-divider">|</span>
              <div className="language-en">EN</div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="home-header-backround-linear">
            <div className="content-up">
              <div className="title-1 text-introduce">
                {" "}
                <FormattedMessage id="banner.MEDICAL-FOUNDATION" />
              </div>
              <div className=" text-introduce">
                <FormattedMessage id="banner.HEALTH-CARE" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search " />
              </div>
            </div>
            <div className="content-down d-flex align-items-end justify-content-center">
              <div className="options ">
                <div className="option-child">
                  <div className="icon-child">
                    <img src={logoHotpital} alt="" style={{ width: "50px" }} />
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.Specialized-examination" />
                    </b>
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <img src={logoTuXa} alt="" style={{ width: "50px" }} />
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.Telemedicine" />
                    </b>
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <img src={logoTongQuan} alt="" style={{ width: "50px" }} />
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.General-examination" />
                    </b>
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <img src={logoYhoc} alt="" style={{ width: "50px" }} />
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.Medical-tests" />
                    </b>
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <img src={logoTinhThan} alt="" style={{ width: "50px" }} />
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.Mental-health" />
                    </b>
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <img src={logoNhaKhoa} alt="" style={{ width: "50px" }} />
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.Dental-examination" />
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
