import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="title">User Redux chien</div>
        <div className="user-redux-body">
          <div>create a user </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
