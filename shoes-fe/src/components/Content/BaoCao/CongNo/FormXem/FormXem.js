import { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";
import MaterialReactTable from "material-react-table";

import { useReactToPrint } from "react-to-print";
import { convertDateForReport } from "~utils/processing_date";
import { border_text_table_config } from "./ConstantVariable";
import { processingInfoColumnTableHaveFooter } from "~utils/processing_data_table";
import { INFO_TABLE, LIST_COLS_FOOTER_SUM } from "./ConstantVariable";
import styles from "./FormXem.module.scss";

const FormXem = ({ data, setShowModal }) => {
  const [columns, setColumns] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Công Nợ",
  });

  useLayoutEffect(() => {
    // call API get database
    fetch("http://localhost:8000/congno_tonghop", {
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
    <div className={styles.container}>
      <div ref={componentRef} className={styles.print_page}>
        <h1>BÁO CÁO CÔNG NỢ</h1>
        <div className={styles.info_time}>
          <label>Từ ngày </label>
          <label>{convertDateForReport(data["DATE_FROM"])} </label>
          <label>đến ngày</label>
          <label>{convertDateForReport(data["DATE_TO"])} </label>
        </div>

        <MaterialReactTable
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
        />
      </div>
      <button className={styles.btn} onClick={handelPrint}>
        In
      </button>
    </div>
  );
};

export default FormXem;
