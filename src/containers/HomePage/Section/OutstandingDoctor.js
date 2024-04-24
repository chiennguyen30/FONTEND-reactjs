import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./OutstandingDoctor.scss";
class OutstandingDoctor extends Component {
  render() {
    const { settings } = this.props;
    return (
      <>
        <div className="section-share section-outstanding-doctor">
          <div className="section-container section-bg-outstanding-doctor">
            <div className="section-header">
              <h2>Bác sĩ nổi bật</h2>
              <button>Xem thêm</button>
            </div>
            <Slider {...settings}>
              <div className="img-customize">
                <div className="bg-img section-specialty-OutstandingDoctor"></div>
                <div>Bác sĩ Chuyên khoa </div>
                <div> Nguyễn Thị Thanh Xuân</div>
                <div>Tim mạch</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-OutstandingDoctor"></div>
                <div>test</div>
                <div>tim mạch</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-OutstandingDoctor"></div>
                <div>test</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-OutstandingDoctor"></div>
                <div>test</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-OutstandingDoctor"></div>
                <div>test</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-OutstandingDoctor"></div>
                <div>test</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-OutstandingDoctor"></div>
                <div>test</div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-OutstandingDoctor"></div>
              </div>
              <div className="img-customize">
                <div className="bg-img section-specialty-OutstandingDoctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
