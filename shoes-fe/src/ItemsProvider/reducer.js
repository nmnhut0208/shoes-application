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
  SET_INFO_KYTINHLUONG,
  SET_INFO_NHANVIEN,
} from "./constants";

const initState = {
  infoItemDe: [],
  infoItemSuon: [],
  infoItemCa: [],
  infoItemQuai: [],
  infoItemGot: [],
  infoItemMau: [],
  infoItemMui: [],
  infoItemKhachHang: [],
  infoItemThoDe: [],
  infoItemThoQuai: [],
  infoItemKyTinhLuong: [],
  infoItemNhanVien: [],
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
    case SET_INFO_GOT: {
      info["infoItemGot"] = action.payload;
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
    case SET_INFO_MUI: {
      info["infoItemMui"] = action.payload;
      break;
    }
    case SET_INFO_KHACHHANG: {
      info["infoItemKhachHang"] = action.payload;
      break;
    }

    case SET_INFO_THODE: {
      info["infoItemThoDe"] = action.payload;
      break;
    }

    case SET_INFO_THOQUAI: {
      info["infoItemThoQuai"] = action.payload;
      break;
    }

    case SET_INFO_KYTINHLUONG: {
      info["infoItemKyTinhLuong"] = action.payload;
      break;
    }

    case SET_INFO_NHANVIEN: {
      info["infoItemNhanVien"] = action.payload;
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
