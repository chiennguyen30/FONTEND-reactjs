import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { GetAllUsers, createAddNewUser } from "../../services/userServices";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    await this.getAllUserFormReact();
  }
  getAllUserFormReact = async () => {
    let res = await GetAllUsers("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        arrUsers: res.users,
      });
    }
  };
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  createNewUser = async (data) => {
    console.log(data);
    try {
      let res = await createAddNewUser(data);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.getAllUserFormReact();
        this.toggleUserModal(); // Đóng modal sau khi thêm người dùng thành công
        // Xóa giá trị của các trường trong form
        this.setState({
          userData: {},
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          close={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button className="btn btn-primary px-3 " onClick={this.handleAddNewUser}>
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-4 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>

              {this.state.arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
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
            </tbody>
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
