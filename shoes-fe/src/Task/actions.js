import {
  SET_TASK_HE_THONG,
  SET_TASK_DANH_MUC,
  SET_TASK_NGHIEP_VU,
  SET_TASK_TRUY_VAN,
  SET_TASK_BAO_CAO,
} from "./constants";

export const setTaskHeThong = (payload) => {
  return {
    type: SET_TASK_HE_THONG,
    payload,
  };
};

export const setTaskDanhMuc = (payload) => {
  return {
    type: SET_TASK_DANH_MUC,
    payload,
  };
};

export const setTaskNghiepVu = (payload) => {
  return {
    type: SET_TASK_NGHIEP_VU,
    payload,
  };
};

export const setTaskTruyVan = (payload) => {
  return {
    type: SET_TASK_TRUY_VAN,
    payload,
  };
};

export const setTaskBaoCao = (payload) => {
  return {
    type: SET_TASK_BAO_CAO,
    payload,
  };
};
