import React, { Component } from "react";
import { connect } from "react-redux";
import icon1 from "../../../assets/images/media/110757-dantrilogo.png";
import icon2 from "../../../assets/images/media/165432-vtcnewslogosvg.png";
import icon3 from "../../../assets/images/media/cuc-cong-nghe-thong-tin-bo-y-te-2.png";
import icon4 from "../../../assets/images/media/ictnews.png";
import icon5 from "../../../assets/images/media/infonet.png";
import icon6 from "../../../assets/images/media/vnexpress.png";
import icon7 from "../../../assets/images/media/vtv1.png";
import icon8 from "../../../assets/images/media/vtv1.png";
import "./About.scss";

class About extends Component {
  render() {
    return (
      <>
        <div>
          <div className="section-share section-container-about">
            <div className="section-about-header">
              <h2>Truyền thông nói gì về Nguyễn Văn Chiến IT</h2>
            </div>
            <div className="section-about-content">
              <div className="content-left">
                <iframe
                  width="200%"
                  height="300px"
                  src="https://www.youtube.com/embed/147SkAVXEqM"
                  title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="content-right">
                <div>
                  <ul>
                    <li>
                      <div>
                        <img src={icon1} alt="" />
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src={icon2} alt="" />
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src={icon3} alt="" />
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src={icon4} alt="" />
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>
                      <div>
                        <img src={icon5} alt="" />
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src={icon6} alt="" />
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src={icon7} alt="" />
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src={icon8} alt="" />
                      </div>
                    </li>
                  </ul>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
