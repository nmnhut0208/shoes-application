import {
  SET_TASK_DANH_MUC,
  SET_TASK_HE_THONG,
  SET_TASK_NGHIEP_VU,
  SET_TASK_TRUY_VAN,
  SET_TASK_BAO_CAO,
  SET_DEFAULT_HEADER,
} from "./constants";
const initState = {
  inforCurrentTask: { infoContent: "Header" },
};

function reducer(state, action) {
  const info = {};
  switch (action.type) {
    case SET_TASK_DANH_MUC: {
      info["infoContent"] = "Danh mục";
      info["infoDetail"] = action.payload;
      break;
    }
    case SET_TASK_HE_THONG: {
      info["infoContent"] = "Hệ thống";
      info["infoDetail"] = action.payload;
      break;
    }
    case SET_TASK_NGHIEP_VU: {
      info["infoContent"] = "Nghiệp vụ";
      info["infoDetail"] = action.payload;
      break;
    }

    case SET_TASK_TRUY_VAN: {
      info["infoContent"] = "Truy vấn";
      info["infoDetail"] = action.payload;
      break;
    }
    case SET_TASK_BAO_CAO: {
      info["infoContent"] = "Báo cáo";
      info["infoDetail"] = action.payload;
      break;
    }
    case SET_DEFAULT_HEADER: {
      info["infoContent"] = "Header";
      info["infoDetail"] = action.payload;
      break;
    }
    default:
      // throw new Error("Action is not supported")
      break;
  }
  return { ...state, inforCurrentTask: info };
}

export { initState };
export default reducer;
