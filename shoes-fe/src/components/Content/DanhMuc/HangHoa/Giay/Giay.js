import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormGiay from "./FormGiay";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";

const list_key = [
  { header: "Mã giày", key: "MAGIAY", width: "21rem" },
  { header: "Đơn giá", key: "DONGIA", width: "10rem" },
  { header: "Tên giày", key: "TENGIAY", width: "40rem" },
  { header: "Mã đế", key: "MADE", width: "10rem" },
  { header: "Tên đế", key: "TENDE", width: "20rem" },
  { header: "Mã sườn", key: "MASUON", width: "10rem" },
  { header: "Tên sườn", key: "TENSUON", width: "20rem" },
  { header: "Mã cá", key: "MACA", width: "10rem" },
  { header: "Tên cá", key: "TENCA", width: "20rem" },
  { header: "Mã quai", key: "MAQUAI", width: "10rem" },
  { header: "Tên quai", key: "TENQUAI", width: "20rem" },
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

const Giay = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Giay - F0025"));
    dispatchTable(actions_table.setTitleTable("Giày - F0024"));
    dispatchTable(actions_table.setComponentForm(FormGiay));
    fetch("http://localhost:8000/items")
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
export default Giay;
