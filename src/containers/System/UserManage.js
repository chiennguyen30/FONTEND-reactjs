import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { GetAllUsers, createAddNewUser, deleteUser } from "../../services/userServices";
import { emitter } from "../../utils/emitter";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [], // Mảng chứa thông tin người dùng
      isOpenModalUser: false, // Biến để kiểm soát việc hiển thị modal
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
      isOpenModalUser: true, // Mở modal để thêm người dùng mới
    });
  };

  // Hàm để toggle hiển thị modal
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser, // Đảo ngược giá trị của biến để hiển thị hoặc ẩn modal
    });
  };

  // Hàm để tạo mới người dùng
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
