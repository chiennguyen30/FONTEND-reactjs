import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
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
        <div className="section-share section-outstanding-doctor">
          <div className="section-container section-bg-outstanding-doctor">
            <div className="section-header">
              <h2>Bác sĩ nổi bật</h2>
              <button>Xem thêm</button>
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
                      <div>
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
