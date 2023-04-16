import { useContext } from "react";
import { ContextTable, actions_table } from "~table_context";

export const useTableContext = () => {
  const [state, dispatch] = useContext(ContextTable);
  return [state, dispatch];
};

export const cleanupContextTable = (dispatch) => {
  dispatch(actions_table.setTitleTable(""));
  dispatch(actions_table.setInforColumnTable({}));
  dispatch(actions_table.setInforTable([]));
  dispatch(actions_table.setInforRecordTable({}));
  dispatch(actions_table.setModeShowTable(false));
  dispatch(actions_table.setTitleModal(""));
  dispatch(actions_table.setComponentForm(<></>));
};
