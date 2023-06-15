import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormSuon from "./FormSuon";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";

const list_key = [
  { header: "Mã sườn", key: "MASUON", width: 10 * rem_to_px },
  { header: "Tên sườn", key: "TENSUON", width: 15 * rem_to_px },
  { header: "Mã gót", key: "MAGOT", width: 10 * rem_to_px },
  { header: "Tên gót", key: "TENGOT", width: 15 * rem_to_px },
  { header: "Mã mũi", key: "MAMUI", width: 10 * rem_to_px },
  { header: "Tên mũi", key: "TENMUI", width: 15 * rem_to_px },
  { header: "Ghi chú", key: "GHICHU", width: 20 * rem_to_px },
];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    header: list_key[obj]["header"],
    size: list_key[obj]["width"],
    accessorKey: list_key[obj]["key"],
    key: list_key[obj]["key"],
  };
  infoColumns.push(info);
}

const Suon = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Sườn - F0021"));
    dispatchTable(actions_table.setTitleTable("Sườn - F0020"));
    dispatchTable(actions_table.setComponentForm(FormSuon));
    fetch("http://localhost:8000/suon")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((info) => {
        dispatchTable(actions_table.setInforColumnTable(infoColumns));
        dispatchTable(actions_table.setInforTable(info));
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

  return <>{renderUI && <TableContent />}</>;
};
export default Suon;
