import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
class MedicalFacility extends Component {
  render() {
    const { settings } = this.props;
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <h2>Cơ sở y tế</h2>
              <button>Xem thêm</button>
            </div>
            <Slider {...settings}>
              <div className="img-customize">
                <div className="bg-img section-specialty-medicalFacility"></div>
                <div style={{ textAlign: "center" }}>Bệnh viện Hữu nghị Việt Đức</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-medicalFacility"></div>
                <div>test</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-medicalFacility"></div>
                <div>test</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-medicalFacility"></div>
                <div>test</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-medicalFacility"></div>
                <div>test</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-medicalFacility"></div>
                <div>test</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-medicalFacility"></div>
                <div>test</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-medicalFacility"></div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-medicalFacility"></div>
              </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
