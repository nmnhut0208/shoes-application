import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormNhanVien from "./FormNhanVien";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Mã nhân viên", key: "MANVIEN", width: 5 * rem_to_px },
  { header: "Tên nhân viên", key: "TENNVIEN", width: 8 * rem_to_px },
  { header: "Loại nhân viên", key: "LOAINVIEN", width: 5 * rem_to_px },
  { header: "Ghi chú", key: "GHICHU", width: 10 * rem_to_px },
];

const infoColumns = processingInfoColumnTable(list_key, false);

const NhanVien = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Nhân viên - F0002"));
    dispatchTable(actions_table.setTitleTable("Nhân viên - F0002"));
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
      console.log("run cleanupContextTable Nhan Vien");
      cleanupContextTable(dispatchTable);
    };
  }, []);

  return <>{renderUI && <TableContent />}</>;
};

export default NhanVien;
