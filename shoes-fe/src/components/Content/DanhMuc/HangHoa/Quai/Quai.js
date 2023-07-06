import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormQuai from "./FormQuai";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Mã quai", key: "MAQUAI", width: 5 * rem_to_px },
  { header: "Tên quai", key: "TENQUAI", width: 10 * rem_to_px },
  { header: "Đơn giá lương", key: "DONGIA", width: 5 * rem_to_px },
  { header: "Ghi chú", key: "GHICHU", width: 20 * rem_to_px },
];

const infoColumns = processingInfoColumnTable(list_key, false);

const Quai = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Quai - F0019"));
    dispatchTable(actions_table.setTitleTable("Quai - F0018"));
    dispatchTable(actions_table.setComponentForm(FormQuai));
    fetch("http://localhost:8000/quai")
      .then((response) => {
        console.log("response: ", response);
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
export default Quai;
