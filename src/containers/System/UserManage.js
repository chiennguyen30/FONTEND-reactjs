import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { GetAllUsers, createAddNewUser, deleteUser, UpdateUser } from "../../services/userServices";
import { emitter } from "../../utils/emitter";
import "./UserManage.scss";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [], // Mảng chứa thông tin người dùng
      isOpenModalAddUser: false, // Biến để kiểm soát việc hiển thị modal
      isOpenModalEditUser: false, // Biến để kiểm soát việc hiển thị modal
      dataUserEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFormReact(); // Gọi hàm để lấy danh sách người dùng khi component được tạo
  }

  // Hàm để gọi API lấy danh sách người dùng
  getAllUserFormReact = async () => {
    let res = await GetAllUsers("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        arrUsers: res.users, // Cập nhật state với danh sách người dùng mới lấy được từ API
      });
    }
  };

  // Hàm xử lý khi click vào nút thêm người dùng
  handleAddNewUser = () => {
    this.setState({
      isOpenModalAddUser: true, // Mở modal để thêm người dùng mới
    });
  };
  handleEditUser = (data) => {
    console.log("data edit user: ", data);
    this.setState({
      isOpenModalEditUser: true,
      dataUserEdit: data,
    });
  };
  // Hàm để toggle hiển thị modal
  toggleUserModal = () => {
    this.setState({
      isOpenModalAddUser: !this.state.isOpenModalAddUser, // Đảo ngược giá trị của biến để hiển thị hoặc ẩn modal
    });
  };
  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser, // Đảo ngược giá trị của biến để hiển thị hoặc ẩn modal
    });
  };

  // call api add user
  createNewUser = async (data) => {
    try {
      let res = await createAddNewUser(data); // Gọi API để tạo mới người dùng
      // neu khac res # 0
      if (res && res.errCode !== 0) {
        alert(res.errMessage); // Hiển thị cảnh báo nếu có lỗi khi tạo mới người dùng
      } else {
        await this.getAllUserFormReact(); // Lấy danh sách người dùng mới sau khi tạo mới thành công
        this.toggleUserModal(); // Đóng modal sau khi thêm người dùng thành công
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // call api edit user
  EditUser = async (data) => {
    try {
      let res = await UpdateUser(data);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.getAllUserFormReact();
        this.toggleEditUserModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //call api delete User
  handleDeleteUser = async (user) => {
    console.log(user);
    try {
      let res = await deleteUser(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUserFormReact(); // Lấy danh sách người dùng mới sau khi xóa thành công
      } else {
        alert("User deleted failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="users-container">
        <ModalAddUser
          isOpen={this.state.isOpenModalAddUser}
          close={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            close={this.toggleEditUserModal}
            dataUserEdit={this.state.dataUserEdit}
            EditUser={this.EditUser}
          />
        )}

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
                      <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
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
