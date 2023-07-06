import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormGiay from "./FormGiay";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Mã giày", key: "MAGIAY", width: 7 * rem_to_px },
  { header: "Đơn giá", key: "DONGIA", width: 3 * rem_to_px },
  { header: "Tên giày", key: "TENGIAY", width: 10 * rem_to_px },
  { header: "Mã đế", key: "MADE", width: 2 * rem_to_px },
  { header: "Tên đế", key: "TENDE", width: 4 * rem_to_px },
  { header: "Mã sườn", key: "MASUON", width: 3 * rem_to_px },
  { header: "Tên sườn", key: "TENSUON", width: 5 * rem_to_px },
  { header: "Mã cá", key: "MACA", width: 3 * rem_to_px },
  { header: "Tên cá", key: "TENCA", width: 5 * rem_to_px },
  { header: "Mã quai", key: "MAQUAI", width: 3 * rem_to_px },
  { header: "Tên quai", key: "TENQUAI", width: 8 * rem_to_px },
];

const infoColumns = processingInfoColumnTable(list_key, false);

const Giay = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Giày - F0025"));
    dispatchTable(actions_table.setTitleTable("Giày - F0024"));
    dispatchTable(actions_table.setComponentForm(FormGiay));
    fetch("http://localhost:8000/giay")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        dispatchTable(actions_table.setInforColumnTable(infoColumns));
        dispatchTable(actions_table.setInforTable(info));
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

  return (
    <>
      {renderUI && <TableContent info_other_column={{ action: 26, stt: 12 }} />}
    </>
  );
};
export default Giay;
