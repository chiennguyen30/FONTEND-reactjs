import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createAddNewUser,
  GetAllUsers,
  deleteUser,
  UpdateUser,
  getTopDoctorHome,
  getAllDoctors,
  saveDetailDoctorServices,
  getAllSpecialty,
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

      if (res && res.errCode === 0) {
        toast.success("Add new user successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
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

      if (res && res.errCode === 0) {
        toast.success("Delete a user successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
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

// actions edit a user
export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await UpdateUser(data);

      if (res && res.errCode === 0) {
        toast.success("Update a user successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Update a user failed");
        dispatch(editUserFailed());
      }
    } catch (error) {
      dispatch(editUserFailed());
      toast.error("Update a user failed");
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHome("");

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};
export const fetchAllDoctors = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorServices(data);

      if (res && res.errCode === 0) {
        toast.success("Save infor detail doctor successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save infor detail doctor failed", {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      toast.error("Save infor detail doctor failed", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
        };
        dispatch(getRequiredDoctorInforSuccess(data));
      } else {
        dispatch(getRequiredDoctorInforFailed());
      }
    } catch (error) {
      dispatch(getRequiredDoctorInforFailed());
      console.log("getRequiredDoctorInforFailed  erro: ", error);
    }
  };
};
export const getRequiredDoctorInforSuccess = (data) => ({
  type: actionTypes.GET_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: data,
});
export const getRequiredDoctorInforFailed = () => ({
  type: actionTypes.GET_REQUIRED_DOCTOR_INFOR_FAILED,
});
