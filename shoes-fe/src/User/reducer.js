import {
  SET_USER_NAME,
  SET_USER_PASSWORD,
  SET_POOL_USER_ACCESS,
} from "./constants";

const initState = {
  userName: "",
  userPassword: "",
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
    case SET_POOL_USER_ACCESS: {
      return { ...state, userPoolAccess: action.payload };
    }
    default:
      // throw new Error("Action is not supported")
      break;
  }
  return state;
}

export { initState };
export default reducer;
