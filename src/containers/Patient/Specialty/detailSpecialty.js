import React, { Component } from "react";
import { connect } from "react-redux";
import "./detailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
class detailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {}

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {}

  render() {
    return (
      <>
        <HomeHeader />
        <div>hello</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(detailSpecialty);
