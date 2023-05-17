import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormGot from "./FormGot";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";

const list_key = [
  { header: "Mã gót", key: "MAGOT", width: 40 * rem_to_px },
  { header: "Tên gót", key: "TENGOT", width: 10 * rem_to_px },
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
const Got = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Gót - F0014"));
    dispatchTable(actions_table.setTitleTable("Gót - F0013"));
    dispatchTable(actions_table.setComponentForm(FormGot));
    fetch("http://localhost:8000/items_got")
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

  return <>{renderUI && <TableContent />}</>;
};
export default Got;
