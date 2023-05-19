import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormGiay from "./FormGiay";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";

const list_key = [
  { header: "Mã giày", key: "MAGIAY", width: 21 * rem_to_px },
  { header: "Đơn giá", key: "DONGIA", width: 10 * rem_to_px },
  { header: "Tên giày", key: "TENGIAY", width: 40 * rem_to_px },
  { header: "Mã đế", key: "MADE", width: 10 * rem_to_px },
  { header: "Tên đế", key: "TENDE", width: 20 * rem_to_px },
  { header: "Mã sườn", key: "MASUON", width: 10 * rem_to_px },
  { header: "Tên sườn", key: "TENSUON", width: 20 * rem_to_px },
  { header: "Mã cá", key: "MACA", width: 10 * rem_to_px },
  { header: "Tên cá", key: "TENCA", width: 20 * rem_to_px },
  { header: "Mã quai", key: "MAQUAI", width: 10 * rem_to_px },
  { header: "Tên quai", key: "TENQUAI", width: 20 * rem_to_px },
];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    header: list_key[obj]["header"],
    size: list_key[obj]["width"],
    accessorKey: list_key[obj]["key"],
    key: list_key[obj]["key"],
  };
  infoColumns.push(info);
}

const Giay = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Giay - F0025"));
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

  return <>{renderUI && <TableContent />}</>;
};
export default Giay;
