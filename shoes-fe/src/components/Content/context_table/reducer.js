import {
  SET_INFOR_COLUMN_TABLE,
  SET_TITLE_TABLE,
  SET_INFOR_TABLE,
  SET_MODE_SHOW_TABLE,
  SET_INFOR_RECORD_TABLE,
  SET_MODE_SHOW_MODAL,
  SET_TITLE_MODAL,
  SET_COMPONENT_FORM,
  SET_ACTION_FORM,
} from "./constants";

const initState = {
  inforShowTable: {
    title: "",
    infoColumnTable: {},
    infoTable: [],
    showTable: false,
    record: {},
    action_row: "",
  },
  infoShowModal: { visible: false, title: "" },
  infoShowForm: { component_form: null },
};

function reducer(state, action) {
  switch (action.type) {
    case SET_TITLE_TABLE: {
      const info = state["inforShowTable"];
      info["title"] = action.payload;
      return { ...state, inforShowTable: info };
    }
    case SET_INFOR_COLUMN_TABLE: {
      const info = state["inforShowTable"];
      info["infoColumnTable"] = action.payload;
      return { ...state, inforShowTable: info };
    }
    case SET_INFOR_TABLE: {
      const info = state["inforShowTable"];
      info["infoTable"] = action.payload;
      return { ...state, inforShowTable: info };
    }
    case SET_MODE_SHOW_TABLE: {
      const info = state["inforShowTable"];
      info["showTable"] = action.payload;
      return { ...state, inforShowTable: info };
    }
    case SET_INFOR_RECORD_TABLE: {
      const info = state["inforShowTable"];
      info["record"] = action.payload;
      return { ...state, inforShowTable: info };
    }

    case SET_MODE_SHOW_MODAL: {
      const info = state["infoShowModal"];
      info["visible"] = action.payload;
      return { ...state, infoShowModal: info };
    }

    case SET_TITLE_MODAL: {
      const info = state["infoShowModal"];
      info["title"] = action.payload;
      return { ...state, infoShowModal: info };
    }

    case SET_COMPONENT_FORM: {
      const info = state["infoShowForm"];
      info["component_form"] = action.payload;
      return { ...state, infoShowForm: info };
    }

    case SET_ACTION_FORM: {
      const info = state["inforShowTable"];
      info["action_row"] = action.payload;
      return { ...state, inforShowTable: info };
    }
    default:
      // throw new Error("Action is not supported")
      break;
  }
}

export { initState };
export default reducer;
