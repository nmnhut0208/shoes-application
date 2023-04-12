import { Table, Space } from "antd";
// import ResizableAntdTable from 'resizable-antd-table';
import { useEffect, useState } from "react";
import { TableContent } from "@common_tag";
import styles from "./Giay.module.scss";
import FormGiay from "./FormGiay";
import { useTableContext, actions_table } from "@table_context";


const list_key = [
  "STT",
  "Mã giày",
  "Đơn giá",
  "Tên giày",
  "Mã đế",
  "Tên đế",
  "Mã sườn",
  "Tên sườn",
  "Mã cá",
  "Tên cá",
  "Item 3",
  "Item 4",
];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    title: list_key[obj],
    width: 100,
    dataIndex: list_key[obj],
    key: list_key[obj].toLowerCase(),
    // fixed: 'left',
  };
  infoColumns.push(info);
}

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

console.log("infoColumns: ", infoColumns);

const Giay = () => {
  const [renderUI, setRenderUI] = useState(false);
  console.log("useTableContext: ", useTableContext())
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Giay - F"));
    dispatchTable(actions_table.setComponentForm(FormGiay));
    fetch("http://localhost:8000/items")
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
        console.log("stateTable: ", stateTable);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  return (
    <>
        {(renderUI && <TableContent/>)}
    </>
  );
};
export default Giay;
