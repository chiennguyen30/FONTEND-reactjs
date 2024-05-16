import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userServices";
class DoctorSchedule extends Component {
  constructor() {
    super();
    this.state = {
      allAvalableTime: [],
      allDays: [],
    };
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  setArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");

        object.lable = this.capitalizeFirstLetter(labelVi);
      } else {
        object.lable = moment(new Date()).add(i, "days").locale("en").format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }

    this.setState({
      allDays: allDays,
    });
  };
  async componentDidMount() {
    let { language } = this.props;
    console.log("tieng viet", moment(new Date()).format("dddd - DD/MM"));
    console.log("tieng anh", moment(new Date()).locale("en").format("ddd - DD/MM"));
    this.setArrDays(language);
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
      this.setArrDays(this.props.language);
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
                <span> Lịch khám </span>
              </i>
            </div>
            <div className="time-content">
              {allAvalableTime && allAvalableTime.length > 0 ? (
                allAvalableTime.map((item, index) => {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn;
                  return (
                    <button className="time-item" key={index}>
                      {timeDisplay}
                    </button>
                  );
                })
              ) : (
                <div>
                  Bác không có lịch hẹn trong khoảng thời gian này vui lòng chọn khoảng thời gian
                  khác
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
