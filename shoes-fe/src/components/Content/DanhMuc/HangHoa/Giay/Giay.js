import { Space } from "antd";
import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormGiay from "./FormGiay";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";

const list_key = [
  { key: "STT", width: "7rem" },
  { key: "Mã giày", width: "21rem" },
  { key: "Đơn giá", width: "10rem" },
  { key: "Tên giày", width: "40rem" },
  { key: "Mã đế", width: "8rem" },
  { key: "Tên đế", width: "16rem" },
  { key: "Mã sườn", width: "8rem" },
  { key: "Tên sườn", width: "16rem" },
  { key: "Mã cá", width: "8rem" },
  { key: "Tên cá", width: "16rem" },
  { key: "Mã quai", width: "8rem" },
  { key: "Tên quai", width: "16rem" },
];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    title: list_key[obj]["key"],
    width: list_key[obj]["width"],
    dataIndex: list_key[obj]["key"],
    key: list_key[obj]["key"].toLowerCase(),
  };
  infoColumns.push(info);
}

console.log(infoColumns);

infoColumns.push({
  title: "Action",
  key: "action",
  render: (_, record) => (
    <Space size="middle">
      <a>Invite {record.name}</a>
      <a>Delete</a>
    </Space>
  ),
});

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
