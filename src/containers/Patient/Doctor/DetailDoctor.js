import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userServices";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";

class DetailDoctor extends Component {
  constructor() {
    super();
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }
  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapShot) {}
  render() {
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${
        detailDoctor.lastName + " " + detailDoctor.firstName
      }`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${
        detailDoctor.firstName + " " + detailDoctor.lastName
      }`;
    }
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-content">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                background: `url(${
                  detailDoctor && detailDoctor.image
                }) center center/cover no-repeat `,
              }}
            ></div>
            <div className="content-right">
              <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
              <div className="down">
                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description && (
                  <span>{detailDoctor.Markdown.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFormParent={this.state.currentDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor doctorIdFormParent={this.state.currentDoctorId} />
            </div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
              <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
            )}
          </div>
          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
