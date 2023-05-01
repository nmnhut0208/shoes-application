import { Space } from "antd";
import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormQuai from "./FormQuai";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";

const list_key = ["STT", "Mã quai", "Tên quai", "Đơn giá lương", "Ghi chú"];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    header: list_key[obj],
    width: 100,
    accessorKey: list_key[obj],
    key: list_key[obj].toLowerCase(),
  };
  infoColumns.push(info);
}

const Quai = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Quai - F0019"));
    dispatchTable(actions_table.setTitleTable("Quai - F0018"));
    dispatchTable(actions_table.setComponentForm(FormQuai));
    fetch("http://localhost:8000/items_quai")
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

  return <>{renderUI && <TableContent />}</>;
};
export default Quai;
