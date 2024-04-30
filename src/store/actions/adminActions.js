import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createAddNewUser,
  GetAllUsers,
  deleteUser,
} from "../../services/userServices";
import { toast } from "react-toastify";
// action get gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderFailed  erro: ", error);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//action get position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log("fetchGenderFailed  erro: ", error);
    }
  };
};
export const fetchPositionSuccess = (PositionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: PositionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//action get role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log("fetchGenderFailed  erro: ", error);
    }
  };
};
export const fetchRoleSuccess = (RoleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: RoleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

// ACTION CREATE NEW USER
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createAddNewUser(data);
      console.log("check res", res);
      if (res && res.errCode === 0) {
        toast.success("Add new user successfully");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
      console.log("fetchGenderFailed  erro: ", error);
    }
  };
};
export const saveUserSuccess = (data) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

// actions get all users
export const fetchAllUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await GetAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(FetchAllUserSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all user failed");
        dispatch(FetchAllUserFailed());
      }
    } catch (error) {
      toast.error("Fetch all user failed");
      dispatch(FetchAllUserFailed());
      console.log("FetchAllUserFailed  erro: ", error);
    }
  };
};
export const FetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const FetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

// actions delete a user
export const deleteAUser = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUser(id);
      console.log("check res", res);
      if (res && res.errCode === 0) {
        toast.success("Delete a user successfully");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete a user failed");
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      dispatch(deleteUserFailed());
      toast.error("Delete a user failed");
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.FETCH_DELETE_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.FETCH_DELETE_FAILED,
});
