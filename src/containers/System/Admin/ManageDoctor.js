import React, { Component } from "react";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import "./ManageDoctor.scss";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userServices";
import { FormattedMessage } from "react-intl";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markDown table
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
      // save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectPrice: "",
      selectPayment: "",
      selectProvince: "",
      selectClinic: "",
      selectSpecialty: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVI} VNĐ`;
          let labelEn = `${item.valueEN} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVI}`;
          let labelEn = `${item.valueEN}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPayment, resPrice, resProvince, resSpecialty } = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
      });
    }

    // khi thay đổi language thì sẽ setState lại
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  resetState = () => {
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      hasOldData: false,
      selectPrice: "",
      selectPayment: "",
      selectProvince: "",
      selectClinic: "",
      selectSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    });
  };
  handleSaveContentMarkDown = () => {
    let { hasOldData } = this.state;
    this.props
      .saveDetailDoctor({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        doctorId: this.state.selectedDoctor.value,
        action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

        selectPrice: this.state.selectPrice.value,
        selectPayment: this.state.selectPayment.value,
        selectProvince: this.state.selectProvince.value,
        nameClinic: this.state.nameClinic,
        addressClinic: this.state.addressClinic,
        note: this.state.note,
        clinicId:
          this.state.selectClinic && this.state.selectClinic.value
            ? this.state.selectClinic.value
            : "",
        specialtyId: this.state.selectSpecialty.value,
      })
      .then(() => {
        this.resetState();
      });
  };

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let { listPrice, listPayment, listProvince } = this.state;
    let res = await getDetailInforDoctor(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let addressClinic,
        nameClinic,
        paymentId,
        priceId,
        provinceId,
        note,
        selectPayment,
        selectPrice,
        selectProvince = " ";
      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        provinceId = res.data.Doctor_Infor.provinceId;

        selectPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
      }
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectPayment: selectPayment,
        selectPrice: selectPrice,
        selectProvince: selectProvince,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectPayment: "",
        selectPrice: "",
        selectProvince: "",
      });
    }
  };

  handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedDoctor;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    let { hasOldData } = this.state;
    console.log("check state :", this.state);
    return (
      <>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <FormattedMessage id="admin.manage-doctor.title" />
          </div>
          <div className="more-infor">
            <div className="content-left">
              <label>
                <FormattedMessage id="admin.manage-doctor.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
                placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
              />
            </div>
            <div className="content-right">
              <label>
                <FormattedMessage id="admin.manage-doctor.introductory-information" />
              </label>
              <textarea
                className="form-control"
                onChange={(e) => this.handleOnChangeText(e, "description")}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="more-infor-extra row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.price" />
              </label>
              <Select
                value={this.state.selectPrice}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listPrice}
                placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                name="selectPrice"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.payment" />
              </label>
              <Select
                value={this.state.selectPayment}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listPayment}
                placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                name="selectPayment"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.province" />
              </label>
              <Select
                value={this.state.selectProvince}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listProvince}
                placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                name="selectProvince"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.nameClinic" />
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleOnChangeText(e, "nameClinic")}
                value={this.state.nameClinic}
              />
            </div>

            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.addressClinic" />
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleOnChangeText(e, "addressClinic")}
                value={this.state.addressClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleOnChangeText(e, "note")}
                value={this.state.note}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.speciality" />
              </label>
              <Select
                value={this.state.selectSpecialty}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listSpecialty}
                placeholder={<FormattedMessage id="admin.manage-doctor.speciality" />}
                name="selectSpecialty"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.choose-clinic" />
              </label>
              <Select
                value={this.state.selectClinic}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listClinic}
                placeholder={<FormattedMessage id="admin.manage-doctor.choose-clinic" />}
                name="selectClinic"
              />
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "350px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>

          <button
            className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
            onClick={() => this.handleSaveContentMarkDown()}
          >
            {hasOldData === true ? (
              <span>
                <FormattedMessage id="admin.manage-doctor.save" />
              </span>
            ) : (
              <span>
                <FormattedMessage id="admin.manage-doctor.add" />
              </span>
            )}
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
