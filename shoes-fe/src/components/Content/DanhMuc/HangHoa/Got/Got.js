import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormGot from "./FormGot";
import { processingInfoColumnTable } from "~utils/processing_data_table";

import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";

const list_key = [
  { header: "Mã gót", key: "MAGOT", width: 5 * rem_to_px },
  { header: "Tên gót", key: "TENGOT", width: 10 * rem_to_px },
  { header: "Ghi chú", key: "GHICHU", width: 20 * rem_to_px },
];

const infoColumns = processingInfoColumnTable(list_key, false);

const Got = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Gót - F0014"));
    dispatchTable(actions_table.setTitleTable("Gót - F0013"));
    dispatchTable(actions_table.setComponentForm(FormGot));
    fetch("http://localhost:8000/got")
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
      .catch((err) => {
        console.log(":error: ", err);
      });

    // cleanup function
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
export default Got;
