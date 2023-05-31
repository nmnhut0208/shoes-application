import {
  SET_INFO_DE,
  SET_INFO_SUON,
  SET_INFO_CA,
  SET_INFO_QUAI,
  SET_INFO_MAU,
  SET_INFO_KHACHHANG,
} from "./constants";

const initState = {
  infoItemDe: [],
  infoItemSuon: [],
  infoItemCa: [],
  infoItemQuai: [],
  infoItemMau: [],
  infoItemKhachHang: [],
};

function reducer(state, action) {
  const info = {};
  switch (action.type) {
    case SET_INFO_DE: {
      info["infoItemDe"] = action.payload;
      break;
    }

    case SET_INFO_SUON: {
      info["infoItemSuon"] = action.payload;
      break;
    }
    case SET_INFO_CA: {
      info["infoItemCa"] = action.payload;
      break;
    }
    case SET_INFO_QUAI: {
      info["infoItemQuai"] = action.payload;
      break;
    }
    case SET_INFO_MAU: {
      info["infoItemMau"] = action.payload;
      break;
    }
    case SET_INFO_KHACHHANG: {
      info["infoItemKhachHang"] = action.payload;
      break;
    }

    default:
      // throw new Error("Action is not supported")
      break;
  }
  return { ...state, ...info };
}

export { initState };
export default reducer;
