import { useReactToPrint } from "react-to-print";
import { useRef, useLayoutEffect, useMemo } from "react";
import { useTableContext, actions_table } from "~table_context";
import { rem_to_px } from "~config/ui";
import styles from "./In.module.scss";
import { TableToPrint } from "~common_tag/reports";
import { convertDateForReport } from "~utils/processing_date";

const COLS_HAVE_SUM_FOOTER = ["SOLUONG", "THANHTIEN"];
const LIST_FORMAT_NUMBER = ["DONGIA", "THANHTIEN", "SOLUONG"];

const infoColumns = [
  {
    header: "Mã Hàng",
    key: "MAGIAY",
    width: 25 * rem_to_px,
    textAlign: "center",
  },
  // { header: "Tên Hàng", key: "TENGIAY", width: 29 * rem_to_px },
  {
    header: "SL",
    key: "SOLUONG",
    width: 10 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Đơn giá",
    key: "DONGIA",
    width: 10 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Thành tiền",
    key: "THANHTIEN",
    width: 15 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Số đơn hàng",
    key: "SODH",
    width: 25 * rem_to_px,
    textAlign: "center",
  },
];

const In = ({ data, flag }) => {
  const [stateTable, dispatchTable] = useTableContext();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Giao hàng",
  });
  const componentRef = useRef();

  const sum_value = useMemo(() => {
    let sum = 0;
    data["table"].forEach((item) => {
      sum += item["THANHTIEN"];
    });
    return sum;
  }, [data["table"]]);

  // console.log("columns: ", data["table"].length);
  // useLayoutEffect(() => {
  //   // dispatchTable(actions_table.setModeShowModal(false));
  //   handelPrint();
  // }, []);
  return (
    <div className={styles.container}>
      <div ref={componentRef} className={styles.print_page}>
        <div className={styles.invoice__header}>
          <h1 className={styles.invoice}>Hóa Đơn</h1>
          <div className={styles.invoice__info_header}>
            <h2>Số: {data["SOPHIEU"]}</h2>
            <h2>Ngày: {convertDateForReport(data["NGAYPHIEU"])}</h2>
          </div>
        </div>
        <h2>Khách Hàng: {data["TENKH"]}</h2>
        <h2>Địa Chỉ: {data["DIACHI"]}</h2>
        <br />
        <TableToPrint
          columns={infoColumns}
          data={data["table"]}
          listHaveFooterSum={COLS_HAVE_SUM_FOOTER}
          LIST_FORMAT_NUMBER={LIST_FORMAT_NUMBER}
          Col_Name_Footer="TENGIAY"
        />
        {flag && (
          <div className={styles.congno}>
            <h2 className={styles.congno_left}>
              Nợ cũ: {parseFloat(data["CONGNO"]).toLocaleString("en")}
            </h2>
            <h2 className={styles.congno_left}>
              Tổng nợ:{" "}
              {parseFloat(data["CONGNO"] + sum_value).toLocaleString("en")}
            </h2>
          </div>
        )}
        <div className={styles.footer}>
          <h2>Người nhận hàng</h2>
          <h2>Người lập</h2>
        </div>
      </div>
      <button
        className={styles.btn}
        onClick={() => {
          handelPrint();
        }}
      >
        In
      </button>
    </div>
  );
};

export default In;
