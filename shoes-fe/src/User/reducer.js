import {
  SET_USER_NAME,
  SET_USER_PASSWORD,
  SET_POOL_USER_ACCESS,
  SET_IS_LOGIN,
  SET_ORIGINAL_SETTINGS,
} from "./constants";

const initState = {
  userName: "",
  userPassword: "",
  isLogin: true,
  userPoolAccess: {},
};

function reducer(state, action) {
  switch (action.type) {
    case SET_USER_NAME: {
      return { ...state, userName: action.payload };
    }
    case SET_USER_PASSWORD: {
      return { ...state, userPassword: action.payload };
    }
    case SET_IS_LOGIN: {
      return { ...state, isLogin: action.payload };
    }
    case SET_POOL_USER_ACCESS: {
      return { ...state, userPoolAccess: action.payload };
    }
    case SET_ORIGINAL_SETTINGS: {
      return action.payload;
    }
    default:
      // throw new Error("Action is not supported")
      break;
  }
  return state;
}

export { initState };
export default reducer;
