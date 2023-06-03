import {
  SET_USER_NAME,
  SET_USER_PASSWORD,
  SET_POOL_USER_ACCESS,
} from "./constants";

export const setUserName = (payload) => {
  return {
    type: SET_USER_NAME,
    payload,
  };
};

export const setUserPassword = (payload) => {
  return {
    type: SET_USER_PASSWORD,
    payload,
  };
};

export const setPoolUserAccess = (payload) => {
  return {
    type: SET_POOL_USER_ACCESS,
    payload,
  };
};
