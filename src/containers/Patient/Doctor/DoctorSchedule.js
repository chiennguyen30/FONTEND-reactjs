import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userServices";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor() {
    super();
    this.state = {
      allAvalableTime: [],
      allDays: [],
      isOpenModalBooking: false,
      dataSheduleTimeModal: {},
    };
  }
  // Hàm viết hoa chữ cái đầu tiên của một chuỗi
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Hàm tạo mảng chứa các đối tượng ngày với label và value tương ứng
  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      const today = moment(new Date()).add(i, "days"); // Tính ngày bằng cách cộng thêm i ngày vào ngày hiện tại
      const ddMM = today.format("DD/MM"); // Định dạng ngày tháng (DD/MM)

      // Kiểm tra ngôn ngữ và đặt label tương ứng
      if (language === LANGUAGES.VI) {
        object.lable =
          i === 0
            ? `Hôm nay - ${ddMM}` // Nếu là ngày hiện tại, gán label "Hôm nay - DD/MM"
            : `${this.capitalizeFirstLetter(today.format("dddd"))} - ${ddMM}`; // Ngược lại, gán label "Tên ngày viết hoa - DD/MM"
      } else {
        object.lable = i === 0 ? `Today - ${ddMM}` : today.locale("en").format("ddd - DD/MM"); // Tương tự với tiếng Anh
      }

      object.value = today.startOf("day").valueOf(); // Gán giá trị value là unix timestamp của ngày đó
      allDays.push(object); // Đẩy đối tượng ngày vào mảng allDays
    }
    return allDays; // Trả về mảng allDays
  };

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {
    let { language } = this.props; // Lấy giá trị language từ Redux store
    let allDays = this.getArrDays(language); // Gọi hàm getArrDays với language

    this.setState({
      allDays: allDays, // Cập nhật state với mảng allDays
    });
  }

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {
    // Nếu language thay đổi
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language); // Gọi hàm getArrDays với language mới

      this.setState({
        allDays: allDays, // Cập nhật state với mảng allDays mới
      });
    }

    // Nếu doctorIdFormParent thay đổi
    if (this.props.doctorIdFormParent !== prevProps.doctorIdFormParent) {
      let allDays = this.getArrDays(this.props.language); // Gọi hàm getArrDays với language hiện tại

      // Lấy lịch trình của bác sĩ theo ngày đầu tiên trong mảng allDays
      let res = await getScheduleDoctorByDate(this.props.doctorIdFormParent, allDays[0].value);

      this.setState({
        allAvalableTime: res.data ? res.data : [], // Cập nhật state với kết quả trả về từ API
      });
    }
  }

  // Hàm xử lý sự kiện khi người dùng thay đổi ngày
  handleOnchangeSelect = async (e) => {
    // Kiểm tra xem doctorIdFormParent có giá trị hợp lệ hay không
    if (this.props.doctorIdFormParent && this.props.doctorIdFormParent !== -1) {
      let doctorId = this.props.doctorIdFormParent; // Lấy doctorId từ props
      let date = e.target.value; // Lấy giá trị ngày từ sự kiện onChange của select

      // Gọi API để lấy lịch trình của bác sĩ theo ngày được chọn
      let res = await getScheduleDoctorByDate(doctorId, date);

      if (res && res.errCode === 0) {
        let allTime = res.data; // Lấy dữ liệu trả về từ API
        this.setState({
          allAvalableTime: allTime ? allTime : [], // Cập nhật state với dữ liệu mới
        });
      }
      console.log("check : ", res); // Log dữ liệu trả về từ API
    }
  };
  handleClickSheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataSheduleTimeModal: time,
    });
  };
  isCloseModalBooking = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let { allDays, allAvalableTime, isOpenModalBooking, dataSheduleTimeModal } = this.state;
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
                          onClick={() => this.handleClickSheduleTime(item)}
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
        <BookingModal
          isOpenModal={isOpenModalBooking}
          isCloseModal={this.isCloseModalBooking}
          data={dataSheduleTimeModal}
        />
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
