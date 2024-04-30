import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./Specialty.scss";

class Specialty extends Component {
  render() {
    const { settings } = this.props;
    return (
      <>
        <div>
          <div className="section-share section-specialty">
            <div className="section-container">
              <div className="section-header">
                <h2>Chuyên khoa</h2>
                <button>Xem thêm</button>
              </div>
              <Slider {...settings}>
                <div className="img-customize">
                  <div className="bg-img section-specialty"></div>
                  <div style={{ textAlign: "center" }}>test</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img section-specialty"></div>
                  <div>test</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img section-specialty"></div>
                  <div>test</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img section-specialty"></div>
                  <div>test</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img section-specialty"></div>
                  <div>test</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img section-specialty"></div>
                  <div>test</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img section-specialty"></div>
                  <div>test</div>
                </div>
                <div className="img-customize">
                  <div className="bg-img section-specialty"></div>
                </div>
                <div className="img-customize">
                  <div className="bg-img section-specialty"></div>
                </div>
              </Slider>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);