import { Space } from "antd";
import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormKhoHang from "./FormKhoHang";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";

const list_key = [
  // { key: "STT", width: "7rem" },
  { header: "Mã kho hàng", key: "MAKHO", width: "21rem" },
  { header: "Tên kho hàng", key: "TENKHO", width: "21rem" },
  { header: "Ghi chú", key: "GHICHU", width: "21rem" },
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

const KhoHang = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Kho hàng - F0025"));
    dispatchTable(actions_table.setTitleTable("Kho hàng - F0024"));
    dispatchTable(actions_table.setComponentForm(FormKhoHang));
    fetch("http://localhost:8000/khohang", {
      // x-access-tokens
      headers: {
        "Content-Type": "application/json",
        "x-access-tokens": "nhutnm123456",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log("info: ", info);
        dispatchTable(actions_table.setInforColumnTable(infoColumns));
        dispatchTable(actions_table.setInforTable(info));
        // if neu co thong tin moi show ne
        dispatchTable(actions_table.setModeShowTable(true));
        setRenderUI(true);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });

    return () => {
      cleanupContextTable(dispatchTable);
    };
  }, []);

  return <>{renderUI && <TableContent />}</>;
};

export default KhoHang;
