import {
  SET_INFOR_COLUMN_TABLE,
  SET_INFOR_TABLE,
  SET_MODE_SHOW_TABLE,
  SET_INFOR_RECORD_TABLE,
  SET_MODE_SHOW_MODAL,
  SET_TITLE_MODAL,
  SET_COMPONENT_FORM,
} from "./constants";

export const setInforColumnTable = (payload) => {
  return {
    type: SET_INFOR_COLUMN_TABLE,
    payload,
  };
};

export const setInforTable = (payload) => {
  return {
    type: SET_INFOR_TABLE,
    payload,
  };
};

export const setModeShowTable = (payload) => {
  return {
    type: SET_MODE_SHOW_TABLE,
    payload,
  };
};

export const setInforRecordTable = (payload) => {
  return {
    type: SET_INFOR_RECORD_TABLE,
    payload,
  };
};

export const setModeShowModal = (payload) => {
  return {
    type: SET_MODE_SHOW_MODAL,
    payload,
  };
};

export const setTitleModal = (payload) => {
  return {
    type: SET_TITLE_MODAL,
    payload,
  };
};

export const setComponentForm = (payload) => {
  return {
    type: SET_COMPONENT_FORM,
    payload,
  };
};

