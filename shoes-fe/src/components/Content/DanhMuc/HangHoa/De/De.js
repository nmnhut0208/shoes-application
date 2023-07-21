import { Space } from "antd";
import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormDe from "./FormDe";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { rem_to_px } from "~config/ui";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Mã Đế", key: "MADE", width: 5 * rem_to_px },
  { header: "Tên Đế", key: "TENDE", width: 10 * rem_to_px },
  {
    header: "Đơn giá Đế",
    key: "DONGIA",
    width: 5 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  { header: "Ghi chú", key: "GHICHU", width: 25 * rem_to_px },
];

const infoColumns = processingInfoColumnTable(list_key, false);

const De = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Đế - F0015"));
    dispatchTable(actions_table.setTitleTable("Đế - F0015"));
    dispatchTable(actions_table.setComponentForm(FormDe));
    fetch("http://localhost:8000/de")
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
  }, []);

  return (
    <div>
      {renderUI && <TableContent info_other_column={{ action: 24, stt: 10 }} />}
    </div>
  );
};

export default De;
