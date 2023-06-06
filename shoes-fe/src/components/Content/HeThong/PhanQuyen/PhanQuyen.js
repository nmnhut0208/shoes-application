import FormPhanQuyen from "./FormPhanQuyen";
import { useState, useEffect } from "react";
import { TableContent } from "~common_tag";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";

const list_key = [
  // { key: "STT", width: "7rem" },
  { header: "Mã Nhân Viên", key: "MANVIEN", width: "21rem" },
  { header: "Mã Form", key: "MAFORM", width: "21rem" },
  { header: "Tên Form", key: "TENFORM", width: "21rem" },
  { header: "Thêm", key: "THEM", width: "10rem" },
  { header: "Sửa", key: "SUA", width: "10rem" },
  { header: "Xóa", key: "XOA", width: "10rem" },
  { header: "Xem", key: "XEM", width: "10rem" },
  { header: "In", key: "IN", width: "10rem" },
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

const PhanQuyen = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Phân Quyền - F0044"));
    dispatchTable(actions_table.setTitleTable("Phân Quyền - F0044"));
    dispatchTable(actions_table.setComponentForm(FormPhanQuyen));
    fetch("http://localhost:8000/phanquyen")
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

export default PhanQuyen;
