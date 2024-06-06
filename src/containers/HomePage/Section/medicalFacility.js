import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { getAllClinic } from "../../../services/userServices";
import { withRouter } from "react-router-dom";
import "./medicalFacility.scss";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data,
      });
    }
  }

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {}

  handleViewDetailClinic = (item) => {
    this.props.history.push(`/detail-clinic/${item.id}`);
  };
  render() {
    let { settings } = this.props;
    let { dataClinics } = this.state;
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <h2>
                <FormattedMessage id="home-page.Health-facilities" />
              </h2>
              <button>
                <FormattedMessage id="home-page.More-infor" />
              </button>
            </div>
            <Slider {...settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <>
                      <div
                        className="section-customize clinic-child"
                        key={index}
                        onClick={() => this.handleViewDetailClinic(item)}
                      >
                        <div
                          className="bg-img section-specialty-medicalFacility"
                          style={{
                            background: `url(${item.image}) center center/cover no-repeat`,
                            backgroundSize: "contain",
                          }}
                        ></div>
                        <div style={{ textAlign: "center" }} className="clinic-name">
                          {item.name}
                        </div>
                      </div>
                    </>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
