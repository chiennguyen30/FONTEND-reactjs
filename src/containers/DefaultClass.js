import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./defaultClass.scss";
class defaultClass extends Component {
  constructor() {
    super();
    this.state = {};
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {}

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {}

  render() {
    let { language } = this.props;
    return <></>;
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

export default connect(mapStateToProps, mapDispatchToProps)(defaultClass);
