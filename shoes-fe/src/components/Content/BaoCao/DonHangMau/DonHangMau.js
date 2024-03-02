import { useRef, useEffect, useState } from "react";
import { TableToPrint } from "~common_tag/reports";
import { useReactToPrint } from "react-to-print";
import { rem_to_px } from "~config/ui";
import styles from "./DonHangMau.module.scss";
import Modal from "./Modal";
import { useTaskContext, resetHeader } from "~task";

const infoColumns = [
  { header: "ĐẾ", key: "DE", width: 15 * rem_to_px, height: 3 * rem_to_px },
  { header: "GÓT", key: "GOT", width: 15 * rem_to_px, height: 3 * rem_to_px },
  {
    header: "SƯỜN",
    key: "SUON",
    width: 15 * rem_to_px,
    height: 3 * rem_to_px,
  },
  {
    header: "CÁ NGẮN/DÀI",
    key: "CA",
    width: 15 * rem_to_px,
    height: 3 * rem_to_px,
  },
  {
    header: "QUAI",
    key: "QUAI",
    width: 15 * rem_to_px,
    height: 3 * rem_to_px,
  },
  {
    header: "SIZE",
    key: "SIZE",
    width: 15 * rem_to_px,
    height: 3 * rem_to_px,
  },
];

const dataTable = [
  {
    DE: "",
    GOT: "",
    SUON: "",
    CA: "",
    QUAI: "",
    SIZE: "",
  },
  {
    DE: "",
    GOT: "",
    SUON: "",
    CA: "",
    QUAI: "",
    SIZE: "",
  },
  {
    DE: "",
    GOT: "",
    SUON: "",
    CA: "",
    QUAI: "",
    SIZE: "",
  },
  {
    DE: "",
    GOT: "",
    SUON: "",
    CA: "",
    QUAI: "",
    SIZE: "",
  },
  {
    DE: "",
    GOT: "",
    SUON: "",
    CA: "",
    QUAI: "",
    SIZE: "",
  },
];

const DonHangMau = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const [showPrint, setShowPrint] = useState(true);
  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Đơn Hàng Mẫu",
  });

  useEffect(() => {
    setShowPrint(false);
    handelPrint();
    resetHeader(dispatchTask);
  }, []);

  return (
    <div className={styles.container}>
      {showPrint && (
        <Modal title="Đơn Hàng Mẫu" setShowModal={setShowPrint}>
          <div ref={componentRef} className={styles.print_page}>
            <TableToPrint
              columns={infoColumns}
              data={dataTable}
              // listHaveFooterSum={COLS_HAVE_SUM_FOOTER}
              // LIST_FORMAT_NUMBER={LIST_FORMAT_NUMBER}
              // Col_Name_Footer="TENKH"
            />
            <br />
            <br />
            <br />
            <TableToPrint columns={infoColumns} data={dataTable} />
          </div>
        </Modal>
      )}
    </div>
  );
};
export default DonHangMau;
