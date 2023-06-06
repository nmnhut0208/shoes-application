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
  // { key: "STT", width: "7rem" },
  { header: "Mã kỳ", key: "MAKY", width: "21rem" },
  { header: "Tên kỳ", key: "TENKY", width: "21rem" },
  { header: "Từ ngày", key: "TUNGAY", width: "21rem" },
  { header: "Đến ngày", key: "DENNGAY", width: "21rem" },
];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    header: list_key[obj]["header"],
    width: list_key[obj]["width"],
    accessorKey: list_key[obj]["key"],
    key: list_key[obj]["key"],
  };
  infoColumns.push(info);
}

console.log(infoColumns);

// infoColumns.push({
//   title: "Action",
//   key: "action",
//   render: (_, record) => (
//     <Space size="middle">
//       <a>Invite {record.name}</a>
//       <a>Delete</a>
//     </Space>
//   ),
// });

const KyTinhLuong = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Kỳ tính lương - F0040"));
    dispatchTable(actions_table.setTitleTable("Kỳ tính lương - F0040"));
    dispatchTable(actions_table.setComponentForm(FormKyTinhLuong));
    fetch("http://localhost:8000/kytinhluong")
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
