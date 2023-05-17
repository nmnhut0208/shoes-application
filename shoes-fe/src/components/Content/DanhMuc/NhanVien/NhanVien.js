import { Space } from "antd";
import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormNhanVien from "./FormNhanVien";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";

const list_key = [
  // { key: "STT", width: "7rem" },
  { header: "Mã nhân viên", key: "MANVIEN", width: "21rem" },
  { header: "Tên nhân viên", key: "TENNVIEN", width: "21rem" },
  { header: "Loại nhân viên", key: "LOAINVIEN", width: "21rem" },
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

const NhanVien = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Nhân viên - F0023"));
    dispatchTable(actions_table.setTitleTable("Nhân viên - F0022"));
    dispatchTable(actions_table.setComponentForm(FormNhanVien));
    fetch("http://localhost:8000/nhanvien")
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
        console.log(err);
      });
    return () => {
      cleanupContextTable(dispatchTable);
    };
  }, []);

  return <>{renderUI && <TableContent />}</>;
};

export default NhanVien;
