import { Space } from "antd";
import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormGiay from "./FormGiay";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";

// const list_key = [
//   { key: "STT", width: "7rem" },
//   { key: "Mã giày", width: "21rem" },
//   { key: "Đơn giá", width: "10rem" },
//   { key: "Tên giày", width: "40rem" },
//   { key: "Mã đế", width: "10rem" },
//   { key: "Tên đế", width: "20rem" },
//   { key: "Mã sườn", width: "10rem" },
//   { key: "Tên sườn", width: "20rem" },
//   { key: "Mã cá", width: "10rem" },
//   { key: "Tên cá", width: "20rem" },
//   { key: "Mã quai", width: "10rem" },
//   { key: "Tên quai", width: "20rem" },
// ];

const list_key = [
  { key: "STT", width: 60 },
  { key: "Mã giày", width: 90 },
  { key: "Đơn giá", width: 70 },
  { key: "Tên giày", width: 200 },
  { key: "Mã đế", width: 80 },
  { key: "Tên đế", width: 120 },
  { key: "Mã sườn", width: 80 },
  { key: "Tên sườn", width: 120 },
  { key: "Mã cá", width: 80 },
  { key: "Tên cá", width: 120 },
  { key: "Mã quai", width: 80 },
  { key: "Tên quai", width: 120 },
];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    header: list_key[obj]["key"],
    size: list_key[obj]["width"],
    accessorKey: list_key[obj]["key"],
    key: list_key[obj]["key"].toLowerCase(),
  };
  infoColumns.push(info);
}

const Giay = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  console.log("Giay");

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
