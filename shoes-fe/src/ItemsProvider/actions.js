import {
  SET_INFO_DE,
  SET_INFO_SUON,
  SET_INFO_CA,
  SET_INFO_QUAI,
  SET_INFO_MAU,
  SET_INFO_GOT,
  SET_INFO_MUI,
  SET_INFO_KHACHHANG,
  SET_INFO_THODE,
  SET_INFO_THOQUAI,
} from "./constants";

export const setInfoDe = (payload) => {
  return {
    type: SET_INFO_DE,
    payload,
  };
};

export const setInfoSuon = (payload) => {
  return {
    type: SET_INFO_SUON,
    payload,
  };
};

export const setInfoCa = (payload) => {
  return {
    type: SET_INFO_CA,
    payload,
  };
};

export const setInfoGot = (payload) => {
  return {
    type: SET_INFO_GOT,
    payload,
  };
};

export const setInfoMui = (payload) => {
  return {
    type: SET_INFO_MUI,
    payload,
  };
};

export const setInfoQuai = (payload) => {
  return {
    type: SET_INFO_QUAI,
    payload,
  };
};

export const setInfoMau = (payload) => {
  return {
    type: SET_INFO_MAU,
    payload,
  };
};

export const setInfoKhachHang = (payload) => {
  return {
    type: SET_INFO_KHACHHANG,
    payload,
  };
};

export const setInfoThoDe = (payload) => {
  return {
    type: SET_INFO_THODE,
    payload,
  };
};

export const setInfoThoQuai = (payload) => {
  return {
    type: SET_INFO_THOQUAI,
    payload,
  };
};
