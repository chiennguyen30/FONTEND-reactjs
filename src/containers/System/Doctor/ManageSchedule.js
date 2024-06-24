import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkDoctorServices } from "../../../services/userServices";

// Khai báo class component ManageSchedule kế thừa từ Component
class ManageSchedule extends Component {
  // Khởi tạo state với giá trị ban đầu
  constructor(props) {
    super(props);

    this.state = {
      listDoctors: [], // Mảng chứa danh sách bác sĩ
      selectedDoctor: {}, // Đối tượng chứa thông tin bác sĩ được chọn
      currentDate: "", // Chuỗi chứa ngày được chọn
      rangeTime: [], // Mảng chứa các khoảng thời gian làm việc
    };
  }

  // Gọi các action để lấy dữ liệu danh sách bác sĩ và khoảng thời gian làm việc khi component được mount
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTime();
  }

  // Hàm xây dựng dữ liệu cho Select component để chọn bác sĩ
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };

  // Cập nhật state khi có sự thay đổi từ Redux store
  componentDidUpdate(prevProps, prevState, snapshot) {
    // Cập nhật state listDoctors khi danh sách bác sĩ từ Redux store thay đổi
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    // Cập nhật state rangeTime khi khoảng thời gian làm việc từ Redux store thay đổi
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }

  // Hàm xử lý khi chọn bác sĩ từ Select component
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  // Hàm xử lý khi chọn ngày từ DatePicker component
  handleOnchangeDatepicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  // Hàm xử lý khi click vào một khoảng thời gian làm việc
  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      // Cập nhật state với bản sao mới
      this.setState({ rangeTime });
    }
  };

  // Hàm xử lý khi click vào nút "Save"
  handleSaveSchedule = async () => {
    let { selectedDoctor, currentDate, rangeTime } = this.state;
    let result = [];
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected Doctor!!");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid date!!");
      return;
    }

    // let formateDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let formateDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule) => {
          let obj = {};
          obj.doctorId = selectedDoctor.value;
          obj.date = formateDate;
          obj.timeType = schedule.keyMap;
          result.push(obj);
        });
      } else {
        toast.error("Invalid selected Type!!");
        return;
      }
    }
    let res = await saveBulkDoctorServices({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formateDate: formateDate,
    });
    if (res && res.errCode === 0) {
      toast.success("Save schedule success!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(" Error saveBulkDoctorServices!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Phần render component
  render() {
    let { listDoctors, rangeTime } = this.state;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    return (
      <>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChangeSelect}
                  options={listDoctors}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  onChange={this.handleOnchangeDatepicker}
                  className="form-control"
                  value={this.state.currentDate}
                  minDate={yesterday}
                />
              </div>
              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <>
                        <button
                          className={
                            item.isSelected === true
                              ? "btn btn-schedule active"
                              : "btn btn-schedule "
                          }
                          key={index}
                          onClick={() => this.handleClickBtnTime(item)}
                        >
                          {item.valueVI}
                        </button>
                      </>
                    );
                  })}
              </div>
              <div className="col-12">
                <button className="btn btn-primary" onClick={() => this.handleSaveSchedule()}>
                  <FormattedMessage id="manage-schedule.save" />
                </button>
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
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
