import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormKyTinhLuong from "./FormKyTinhLuong";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Mã kỳ", key: "MAKY", width: 3 * rem_to_px },
  { header: "Tên kỳ", key: "TENKY", width: 5 * rem_to_px },
  { header: "Từ ngày", key: "TUNGAY", width: 10 * rem_to_px },
  { header: "Đến ngày", key: "DENNGAY", width: 10 * rem_to_px },
];

const infoColumns = processingInfoColumnTable(list_key, false);

const KyTinhLuong = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Kỳ tính lương - F0040"));
    dispatchTable(actions_table.setTitleTable("Kỳ tính lương - F0040"));
    dispatchTable(actions_table.setComponentForm(FormKyTinhLuong));
    fetch("http://localhost:8000/kytinhluong")
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

  return (
    <>
      {renderUI && <TableContent info_other_column={{ action: 24, stt: 10 }} />}
    </>
  );
};

export default KyTinhLuong;
