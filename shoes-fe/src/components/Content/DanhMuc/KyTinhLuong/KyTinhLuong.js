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
import { IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { convertDateForReport } from "~utils/processing_date";

const list_key = [
  { header: "Mã kỳ", key: "MAKY", width: 3 * rem_to_px },
  { header: "Tên kỳ", key: "TENKY", width: 5 * rem_to_px },
  { header: "Từ ngày", key: "TUNGAY", width: 15 * rem_to_px , Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,},
  { header: "Đến ngày", key: "DENNGAY", width: 15 * rem_to_px , Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,},
];

const infoColumns = processingInfoColumnTable(list_key, false);

const KyTinhLuong = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();
  const [count, setCount] = useState(0);

  const handleUpdate = () => {
    fetch("http://localhost:8000/kytinhluong/update_tenky")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        if (info["status"] === "success") {
          alert("Update thành công");
          setCount(count + 1);
        } else {
          alert("Update thất bại");
        }
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  };

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
  }, [count]);

  return (
    <>
      <Tooltip arrow title="Update">
        <IconButton
          onClick={() => {
            handleUpdate();
          }}
        >
          <Edit style={{ color: "green" }} fontSize="large" />
        </IconButton>
      </Tooltip>
      {renderUI && <TableContent info_other_column={{ action: 24, stt: 15 }} />}
    </>
  );
};

export default KyTinhLuong;
