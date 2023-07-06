import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormCa from "./FormCa";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Mã Cá", key: "MACA", width: 5 * rem_to_px },
  { header: "Tên Cá", key: "TENCA", width: 10 * rem_to_px },
  // { header: "Mã Mũi", key: "MAMUI", width: 3 * rem_to_px },
  // { header: "Tên Mũi", key: "TENMUI", width: 5 * rem_to_px },
  { header: "Ghi chú", key: "GHICHU", width: 10 * rem_to_px },
];

const infoColumns = processingInfoColumnTable(list_key, false);

const Ca = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Cá - F0022"));
    dispatchTable(actions_table.setTitleTable("Cá - F0022"));
    dispatchTable(actions_table.setComponentForm(FormCa));
    fetch("http://localhost:8000/ca")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        dispatchTable(actions_table.setInforColumnTable(infoColumns));
        dispatchTable(actions_table.setInforTable(info));
        // if neu co thong tin moi show ne
        dispatchTable(actions_table.setModeShowTable(true));
        setRenderUI(true);
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

export default Ca;
