import {
  SET_INFO_DE,
  SET_INFO_SUON,
  SET_INFO_CA,
  SET_INFO_QUAI,
  SET_INFO_MAU,
  SET_INFO_KHACHHANG,
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