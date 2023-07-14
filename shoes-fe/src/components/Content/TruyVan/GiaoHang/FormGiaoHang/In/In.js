import { useReactToPrint } from "react-to-print";
import { useRef, useLayoutEffect } from "react";
import { useTableContext, actions_table } from "~table_context";
import { rem_to_px } from "~config/ui";
import styles from "./In.module.scss";
import { TableToPrint } from "~common_tag/reports";
import { convertDateForReport } from "~utils/processing_date";

const COLS_HAVE_SUM_FOOTER = ["SOLUONG", "THANHTIEN"];
const LIST_FORMAT_NUMBER = ["DONGIA", "THANHTIEN", "SOLUONG"];

const infoColumns = [
  { header: "Mã Hàng", key: "MAGIAY", width: 16.5 * rem_to_px },
  { header: "Tên Hàng", key: "TENGIAY", width: 29 * rem_to_px },
  {
    header: "SL",
    key: "SOLUONG",
    width: 5 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Đơn giá",
    key: "DONGIA",
    width: 8 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Thành tiền",
    key: "THANHTIEN",
    width: 10 * rem_to_px,
    textAlign: "right",
  },
  { header: "Số đơn hàng", key: "SODH", width: 10 * rem_to_px },
];

const In = ({ data }) => {
  const [stateTable, dispatchTable] = useTableContext();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Thông tin phân công",
  });
  const componentRef = useRef();

  console.log("columns: ", data["table"].length);
  useLayoutEffect(() => {
    dispatchTable(actions_table.setModeShowModal(false));
    handelPrint();
  }, []);
  return (
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

      <div className={styles.footer}>
        <h2>Người nhận hàng</h2>
        <h2>Người lập</h2>
      </div>
    </div>
  );
};

export default In;
