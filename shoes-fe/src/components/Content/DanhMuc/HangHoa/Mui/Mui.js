import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormMui from "./FormMui";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";

import { rem_to_px } from "~config/ui";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Mã Mũi", key: "MAMUI", width: 5 * rem_to_px },
  { header: "Tên Mũi", key: "TENMUI", width: 10 * rem_to_px },
  { header: "Ghi chú", key: "GHICHU", width: 20 * rem_to_px },
];

const infoColumns = processingInfoColumnTable(list_key, false);

const Mui = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Mũi - F0011"));
    dispatchTable(actions_table.setTitleTable("Mũi - F0011"));
    dispatchTable(actions_table.setComponentForm(FormMui));
    fetch("http://localhost:8000/mui")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        dispatchTable(actions_table.setInforColumnTable(infoColumns));
        dispatchTable(actions_table.setInforTable(info));
        // if neu co thong tin moi show ne
        dispatchTable(actions_table.setModeShowTable(true));
        setRenderUI(true);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      cleanupContextTable(dispatchTable);
    };
  }, []);

  return (
    <>
      {renderUI && <TableContent info_other_column={{ action: 24, stt: 10 }} />}
    </>
  );
};

export default Mui;
