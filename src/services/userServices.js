import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const GetAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createAddNewUser = (data) => {
  console.log("check data: ", data);
  return axios.post(`/api/create-new-user`, data);
};

export { handleLoginApi, GetAllUsers, createAddNewUser };
