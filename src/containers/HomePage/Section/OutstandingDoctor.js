import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
class OutstandingDoctor extends Component {
  constructor() {
    super();
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  render() {
    const { settings, language } = this.props;
    let arrDoctors = this.state.arrDoctors;
    console.log("check doctor: ", arrDoctors);
    return (
      <>
        <div className="section-share section-Outstanding-doctor">
          <div className="section-container section-bg-Outstanding-doctor">
            <div className="section-header">
              <h2>
                <FormattedMessage id="home-page.Outstanding-doctor" />
              </h2>
              <button>
                <FormattedMessage id="home-page.More-infor" />
              </button>
            </div>
            <Slider {...settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = [];
                  if (item.image) {
                    imageBase64 = new Buffer.from(item.image, "base64").toString("binary");
                  }
                  let nameVi = `${item.positionData.valueVi}, ${
                    item.lastName + " " + item.firstName
                  }`;
                  let nameEn = `${item.positionData.valueEn}, ${
                    item.firstName + " " + item.lastName
                  }`;
                  return (
                    <div className="img-customize" key={index}>
                      <div
                        className="bg-img section-specialty-OutstandingDoctor"
                        style={{
                          background: `url(${imageBase64}) center center/cover no-repeat`,
                          backgroundSize: "contain",
                        }}
                      ></div>
                      <div style={{ marginTop: 20, fontWeight: 600, fontSize: 16 }}>
                        <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div>Tim mạch</div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
