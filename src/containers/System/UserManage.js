import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { handleGetAllUsers } from "../../services/userServices";
import "./UserManage.scss";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
    let res = await handleGetAllUsers("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        arrUsers: res.users,
      });
    }
    console.log("data: ", res);
  }

  render() {
    return (
      <div className="users-container">
        <div className="title text-center">Manage users</div>
        <div className="users-table mt-4 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>

            {this.state.arrUsers.map((item, index) => {
              return (
                <tr>
                  <td key={index}>{item.email}</td>
                  <td key={index}>{item.firstName}</td>
                  <td key={index}>{item.lastName}</td>
                  <td key={index}>{item.address}</td>
                  <td>
                    <button className="btn-edit">
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button className="btn-delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
