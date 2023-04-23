import { Space } from "antd";
import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormKhachHang from "./FormKhachHang";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";

const list_key = [
  { key: "STT", width: "7rem" },
  { key: "Mã khách hàng", width: "15rem" },
  { key: "Tên khách hàng", width: "20rem" },
  { key: "Địa chỉ", width: "30rem" },
  { key: "Điện thoại", width: "10rem" },
  { key: "Fax", width: "10rem" },
  { key: "Email", width: "10rem" },
  { key: "Ghi chú", width: "16rem" },
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

const KhachHang = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleTable("Khách hàng - F0004"));
    dispatchTable(actions_table.setTitleModal("Khách hàng - F0005"));
    dispatchTable(actions_table.setComponentForm(FormKhachHang));
    fetch("http://localhost:8000/items_khachhang")
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
export default KhachHang;
