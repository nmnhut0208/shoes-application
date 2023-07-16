import { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { convertDateForReport } from "~utils/processing_date";
import styles from "./FormXem.module.scss";
import { TableToPrint } from "~common_tag/reports";
import { rem_to_px } from "~config/ui";

const COLS_HAVE_SUM_FOOTER = ["TONGNO", "TONGMUA", "TONGTRA", "CONGNO"];
const LIST_FORMAT_NUMBER = ["TONGNO", "TONGMUA", "TONGTRA", "CONGNO"];

const infoColumns = [
  { header: "MÃ KH", key: "MAKH", width: 14 * rem_to_px },
  { header: "TÊN KHÁCH HÀNG", key: "TENKH", width: 25 * rem_to_px },
  {
    header: "NỢ ĐẦU KỲ",
    key: "TONGNO",
    width: 10 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "TỔNG MUA",
    key: "TONGMUA",
    width: 10 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "ĐÃ TRẢ",
    key: "TONGTRA",
    width: 10 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "CÒN NỢ",
    key: "CONGNO",
    width: 10 * rem_to_px,
    textAlign: "right",
  },
];

const FormXem = ({ data, setShowModal }) => {
  // const [columns, setColumns] = useState([]);
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
        <TableToPrint
          columns={infoColumns}
          data={dataTable}
          listHaveFooterSum={COLS_HAVE_SUM_FOOTER}
          LIST_FORMAT_NUMBER={LIST_FORMAT_NUMBER}
          Col_Name_Footer="TENKH"
        />
      </div>
      <button className={styles.btn} onClick={handelPrint}>
        In
      </button>
    </div>
  );
};

export default FormXem;
