import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userServices";
import { FormattedMessage } from "react-intl";
class DoctorSchedule extends Component {
  constructor() {
    super();
    this.state = {
      allAvalableTime: [],
      allDays: [],
    };
  }
  // viết in hoa chữ cái đầu
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      const today = moment(new Date()).add(i, "days");
      const ddMM = today.format("DD/MM");
      if (language === LANGUAGES.VI) {
        object.lable =
          i === 0
            ? `Hôm nay - ${ddMM}`
            : `${this.capitalizeFirstLetter(today.format("dddd"))} - ${ddMM}`;
      } else {
        object.lable = i === 0 ? `Today - ${ddMM}` : today.locale("en").format("ddd - DD/MM");
      }
      object.value = today.startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };
  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);

    this.setState({
      allDays: allDays,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorIdFormParent !== prevProps.doctorIdFormParent) {
      let allDays = this.getArrDays(this.props.language);

      let res = await getScheduleDoctorByDate(this.props.doctorIdFormParent, allDays[0].value);
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }
  }
  handleOnchangeSelect = async (e) => {
    if (this.props.doctorIdFormParent && this.props.doctorIdFormParent !== -1) {
      let doctorId = this.props.doctorIdFormParent;
      let date = e.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);

      if (res && res.errCode === 0) {
        let allTime = res.data;
        this.setState({
          allAvalableTime: allTime ? allTime : [],
        });
      }
      console.log("check : ", res);
    }
  };
  render() {
    let { allDays, allAvalableTime } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(e) => this.handleOnchangeSelect(e)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.lable}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content">
              {allAvalableTime && allAvalableTime.length > 0 ? (
                <>
                  <div className="time-content-btns">
                    {allAvalableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;
                      return (
                        <button
                          className={language === LANGUAGES.VI ? "btn-vie" : "btn-en"}
                          key={index}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <span>
                      <FormattedMessage id="patient.detail-doctor.choose" />
                      <i className="far fa-hand-point-up "></i>
                      <FormattedMessage id="patient.detail-doctor.book-free" />
                    </span>
                  </div>
                </>
              ) : (
                <div className="no-shedule">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
