import { Space } from "antd";
import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormKyTinhLuong from "./FormKyTinhLuong";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";

const list_key = [
  { key: "STT", width: "7rem" },
  { key: "Mã kỳ", width: "21rem" },
  { key: "Tên kỳ", width: "21rem" },
  { key: "Từ ngày", width: "21rem" },
  { key: "Đến ngày", width: "21rem" },
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

const KyTinhLuong = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Kỳ tính lương - F0021"));
    dispatchTable(actions_table.setTitleTable("Kỳ tính lương - F0020"));
    dispatchTable(actions_table.setComponentForm(FormKyTinhLuong));
    fetch("http://localhost:8000/items_ky_tinh_luong")
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

  return <>{renderUI && <TableContent />}</>;
};

export default KyTinhLuong;
