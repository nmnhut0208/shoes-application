import { Space } from "antd";
import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormKhoHang from "./FormKhoHang";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Mã kho hàng", key: "MAKHO", width: 5 * rem_to_px },
  { header: "Tên kho hàng", key: "TENKHO", width: 15 * rem_to_px },
  { header: "Ghi chú", key: "GHICHU", width: 15 * rem_to_px },
];

const infoColumns = processingInfoColumnTable(list_key, false);

const KhoHang = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Kho hàng - F0007"));
    dispatchTable(actions_table.setTitleTable("Kho hàng - F0007"));
    dispatchTable(actions_table.setComponentForm(FormKhoHang));
    fetch("http://localhost:8000/khohang")
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

  return (
    <>
      {renderUI && <TableContent info_other_column={{ action: 24, stt: 10 }} />}
    </>
  );
};

export default KhoHang;
