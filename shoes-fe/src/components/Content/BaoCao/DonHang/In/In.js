import { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";
import MaterialReactTable from "material-react-table";

import { useReactToPrint } from "react-to-print";
import { convertDateForReport } from "~utils/processing_date";
import { border_text_table_config } from "~config/ui";
import { processingInfoColumnTableHaveFooter } from "~utils/processing_data_table";
import { INFO_TABLE, LIST_COLS_FOOTER_SUM } from "./ConstantVariable";
import styles from "./In.module.scss";

const In = ({ data, setShowModal }) => {
  const [columns, setColumns] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  useLayoutEffect(() => {
    // call API get database
    fetch("http://localhost:8000/donhang/get_all_info_donhang", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((info) => {
        console.log("info: ", info);
        let info_columns = processingInfoColumnTableHaveFooter(
          INFO_TABLE,
          LIST_COLS_FOOTER_SUM,
          info
        );
        console.log("info_columns: ", info_columns);
        setColumns(info_columns);
        setDataTable(info);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  return (
    <div className={styles.print_page}>
      <h1>BÁO CÁO ĐƠN HÀNG</h1>
      <label>Từ ngày </label>
      <span>{convertDateForReport(data["DATE_FROM"])} </span>
      <label>đến ngày</label>
      <span>{convertDateForReport(data["DATE_TO"])} </span>

      <MaterialReactTable
        columns={columns}
        data={dataTable}
        {...border_text_table_config}
        // knmhgk
        enableTopToolbar={false}
        enablePagination={false}
        // scroll to bottom
        enableRowVirtualization
        muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
        // group Mã giày
        enableGrouping
        initialState={{
          grouping: ["SODH", "NGAYDH", "TENKH", "TENGIAY"],
          expanded: true,
        }}
      />
    </div>
  );
};

export default In;
