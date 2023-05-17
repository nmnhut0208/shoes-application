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
  { header: "Mã khách hàng", key: "MAKH", width: "15rem" },
  { header: "Tên khách hàng", key: "TENKH", width: "20rem" },
  { header: "Địa chỉ", key: "DIACHI", width: "30rem" },
  { header: "Điện thoại", key: "TEL", width: "10rem" },
  { header: "Fax", key: "FAX", width: "10rem" },
  { header: "Email", key: "EMAIL", width: "10rem" },
  { header: "Ghi chú", key: "GHICHU", width: "16rem" },
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
