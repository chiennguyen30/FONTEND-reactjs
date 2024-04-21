import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Specialty.scss";
class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <>
        <div>
          <div className="section-specialty">
            <div className="specialty-content">
              <Slider {...settings}>
                <div className="item-1">
                  <h3>1</h3>
                </div>
                <div className="item-2">
                  <h3>2</h3>
                </div>
                <div className="item-3">
                  <h3>3</h3>
                </div>
                <div className="item-4">
                  <h3>4</h3>
                </div>
                <div className="item-5">
                  <h3>5</h3>
                </div>
                <div className="item-6">
                  <h3>6</h3>
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
