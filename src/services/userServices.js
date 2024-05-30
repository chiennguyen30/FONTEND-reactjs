import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const GetAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createAddNewUser = (data) => {
  return axios.post(`/api/create-new-user`, data);
};

const UpdateUser = (data) => {
  return axios.put(`/api/edit-user`, data);
};

const deleteUser = (id) => {
  return axios.delete(`/api/delete-user`, { data: { id: id } });
};

const getAllCodeService = (Type) => {
  return axios.get(`/api/allcode?type=${Type}`);
};

const getTopDoctorHome = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorServices = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};
const saveBulkDoctorServices = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id/?id=${id}`);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date/?doctorId=${doctorId}&date=${date}`);
};

const getExtraDoctorInforById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id/?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id/?doctorId=${doctorId}`);
};

const postPatientBookingAppoinMent = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
const postVerifyBookAppointment = (data) => {
  console.log("data : ", data);
  return axios.post("/api/verify-book-appointment", data);
};
export {
  handleLoginApi,
  GetAllUsers,
  createAddNewUser,
  deleteUser,
  UpdateUser,
  getAllCodeService,
  getTopDoctorHome,
  getAllDoctors,
  saveDetailDoctorServices,
  getDetailInforDoctor,
  saveBulkDoctorServices,
  getScheduleDoctorByDate,
  getExtraDoctorInforById,
  getProfileDoctorById,
  postPatientBookingAppoinMent,
  postVerifyBookAppointment,
};
