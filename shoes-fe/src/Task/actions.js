import { SET_TASK_HE_THONG, SET_TASK_DANH_MUC } from "./constants";

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
