import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
class HandBook extends Component {
  render() {
    const { settings } = this.props;
    return (
      <>
        <div>
          <div className="section-share section-container-hand-book">
            <div className="section-container">
              <div className="section-header">
                <h2>
                  <FormattedMessage id="home-page.Handbook" />
                </h2>
                <button>
                  <FormattedMessage id="home-page.More-infor" />
                </button>
              </div>
              <Slider {...settings}>
                <div className="section-customize">
                  <div className="bg-img section-img-hand-book"></div>
                  <div>test</div>
                </div>
                <div className="section-customize">
                  <div className="bg-img section-img-hand-book"></div>
                  <div>test</div>
                </div>
                <div className="section-customize">
                  <div className="bg-img section-img-hand-book"></div>
                  <div>test</div>
                </div>
                <div className="section-customize">
                  <div className="bg-img section-img-hand-book"></div>
                  <div>test</div>
                </div>
                <div className="section-customize">
                  <div className="bg-img section-img-hand-book"></div>
                  <div>test</div>
                </div>
                <div className="section-customize">
                  <div className="bg-img section-img-hand-book"></div>
                  <div>test</div>
                </div>
                <div className="section-customize">
                  <div className="bg-img section-img-hand-book"></div>
                  <div>test</div>
                </div>
                <div className="section-customize">
                  <div className="bg-img section-img-hand-book"></div>
                </div>
                <div className="section-customize">
                  <div className="bg-img section-img-hand-book"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
