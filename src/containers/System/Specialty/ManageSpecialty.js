import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { postCreateNewSpecialty } from "../../../services/userServices";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
    this.fileInputRef = React.createRef(); // Thêm dòng này
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {}

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {}
  handleOnchangeImg = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };
  handleOnchangeInput = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleNewSaveSpecialty = async () => {
    let res = await postCreateNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("successed !!!");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
      if (this.fileInputRef.current) {
        this.fileInputRef.current.value = ""; // Đặt lại giá trị của input file
      }
    } else {
      toast.error("Error!!!");
    }
    console.log("check state : ", this.state);
  };
  render() {
    return (
      <>
        <div className="manage-specialty-container">
          <div className="ms-title">quan ly chuyen khoa</div>
          <div className="add-new-specialty row">
            <div className="col-6 form-group">
              <label htmlFor="">Tên chuyên khoa</label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={(e) => this.handleOnchangeInput(e, "name")}
              />
            </div>
            <div className="col-2">
              <label htmlFor="">Ảnh chuyên khoa</label>
              <input
                type="file"
                ref={this.fileInputRef} // Gán ref cho input file
                className="form-control-file"
                onChange={(e) => this.handleOnchangeImg(e)}
              />
            </div>
            <div className="col-12">
              <MdEditor
                style={{ height: "350px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
            <div className="col-12">
              <button className="btn-save-specialty" onClick={() => this.handleNewSaveSpecialty()}>
                Save
              </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
