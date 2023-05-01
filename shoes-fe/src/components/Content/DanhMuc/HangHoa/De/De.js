import { Space } from "antd";
import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormDe from "./FormDe";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";

const list_key = [
  { key: "STT", width: "7rem" },
  { key: "Mã Đế", width: "21rem" },
  { key: "Tên Đế", width: "21rem" },
  { key: "Đơn giá Đế", width: "21rem" },
  { key: "Ghi chú", width: "21rem" },
];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    header: list_key[obj]["key"],
    width: list_key[obj]["width"],
    accessorKey: list_key[obj]["key"],
    key: list_key[obj]["key"].toLowerCase(),
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

const De = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Đế - F0025"));
    dispatchTable(actions_table.setTitleTable("Đế - F0024"));
    dispatchTable(actions_table.setComponentForm(FormDe));
    fetch("http://localhost:8000/items_de")
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
  }, []);

  return <div>{renderUI && <TableContent />}</div>;
};

export default De;
