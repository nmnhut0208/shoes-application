import { Space } from "antd";
import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormCa from "./FormCa";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";

const list_key = [
  // { key: "STT", width: "7rem" },
  { header: "Mã Cá", key: "MACA", width: "100px" },
  { header: "Tên Cá", key: "TENCA", width: "100px" },
  { header: "Mã Mũi", key: "MAMUI", width: "100px" },
  { header: "Tên Mũi", key: "TENMUI", width: "100px" },
  { header: "Ghi chú", key: "GHICHU", width: "100px" },
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

const Ca = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Cá - F0023"));
    dispatchTable(actions_table.setTitleTable("Cá - F0022"));
    dispatchTable(actions_table.setComponentForm(FormCa));
    fetch("http://localhost:8000/ca")
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

export default Ca;
