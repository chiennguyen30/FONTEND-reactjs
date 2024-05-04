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
export {
  handleLoginApi,
  GetAllUsers,
  createAddNewUser,
  deleteUser,
  UpdateUser,
  getAllCodeService,
  getTopDoctorHome,
};
