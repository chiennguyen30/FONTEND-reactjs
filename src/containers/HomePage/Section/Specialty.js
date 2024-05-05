import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
class Specialty extends Component {
  render() {
    const { settings } = this.props;
    return (
      <>
        <div>
          <div className="section-share section-specialty">
            <div className="section-container">
              <div className="section-header">
                <h2>
                  <FormattedMessage id="home-page.Specialist" />
                </h2>
                <button>
                  <FormattedMessage id="home-page.More-infor" />
                </button>
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
