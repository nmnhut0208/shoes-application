import FormPhanQuyen from "./FormPhanQuyen";
import { useState, useEffect } from "react";
import { TableContent } from "~common_tag";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Mã Nhân Viên", key: "MANVIEN", width: 5 * rem_to_px },
  { header: "Mã Form", key: "MAFORM", width: 5 * rem_to_px },
  { header: "Tên Form", key: "TENFORM", width: 10 * rem_to_px },
  { header: "Thêm", key: "THEM", width: 1 * rem_to_px },
  { header: "Sửa", key: "SUA", width: 1 * rem_to_px },
  { header: "Xóa", key: "XOA", width: 1 * rem_to_px },
  { header: "Xem", key: "XEM", width: 1 * rem_to_px },
  { header: "In", key: "IN", width: 1 * rem_to_px },
];

const infoColumns = processingInfoColumnTable(list_key, false);

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
