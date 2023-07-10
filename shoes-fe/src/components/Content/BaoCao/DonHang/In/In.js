import { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import Html2Pdf from "js-html2pdf";

import { useReactToPrint } from "react-to-print";
import { convertDateForReport } from "~utils/processing_date";
import { border_text_table_config } from "./ConstantVariable";
import { processingInfoColumnTableHaveFooter } from "~utils/processing_data_table";
import { INFO_TABLE, LIST_COLS_FOOTER_SUM } from "./ConstantVariable";
import styles from "./In.module.scss";
import MyTable from "./MyTable";

const In = ({ data, setShowModal }) => {
  const [columns, setColumns] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Đơn hàng",
  });

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

  useLayoutEffect(() => {
    if (dataTable.length > 0) {
      // setShowModal(false);
      handelPrint();
    }
  }, [dataTable]);

  return (
    <div ref={componentRef} className={styles.print_page} id="print_content">
      <h1>BÁO CÁO ĐƠN HÀNG</h1>
      <div className={styles.info_time}>
        <label>Từ ngày </label>
        <label>{convertDateForReport(data["DATE_FROM"])} </label>
        <label>đến ngày</label>
        <label>{convertDateForReport(data["DATE_TO"])} </label>
      </div>

      <MyTable columns={INFO_TABLE} data={dataTable} />

      {/* <MaterialReactTable
        columns={columns}
        data={dataTable}
        {...border_text_table_config}
        muiTableProps={{
          sx: {
            tableLayout: "fixed",
          },
        }}
        // knmhgk
        enableTopToolbar={false}
        enableColumnActions={false}
        enableSorting={false}
        // scroll to bottom
        // enable phân trang
        enablePagination={false}
        enableBottomToolbar={false}
        // group Mã giày
        enableGrouping={false}
        initialState={{
          //   grouping: ["SODH", "NGAYDH", "TENKH", "TENGIAY"],
          grouping: ["SODH"],
          expanded: true,
        }}
      /> */}
    </div>
  );
};

export default In;
