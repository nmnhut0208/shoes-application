import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormKhachHang from "./FormKhachHang";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Mã khách hàng", key: "MAKH", width: 5 * rem_to_px },
  { header: "Tên khách hàng", key: "TENKH", width: 10 * rem_to_px },
  { header: "Địa chỉ", key: "DIACHI", width: 10 * rem_to_px },
  { header: "Điện thoại", key: "TEL", width: 5 * rem_to_px },
  { header: "Fax", key: "FAX", width: 5 * rem_to_px },
  { header: "Email", key: "EMAIL", width: 5 * rem_to_px },
  { header: "Ghi chú", key: "GHICHU", width: 10 * rem_to_px },
];

const infoColumns = processingInfoColumnTable(list_key, false);

const KhachHang = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleTable("Khách hàng - F0004"));
    dispatchTable(actions_table.setTitleModal("Khách hàng - F0005"));
    dispatchTable(actions_table.setComponentForm(FormKhachHang));
    fetch("http://localhost:8000/khachhang")
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
