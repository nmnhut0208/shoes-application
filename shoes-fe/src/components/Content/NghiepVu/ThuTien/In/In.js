import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Signature } from "~common_tag/reports";
import { convertDateForReport } from "~utils/processing_date";
import { getNoKhachHangUntilDate } from "~utils/api_get_congno";

import styles from "./In.module.scss";

const In = ({ data, setShowModal }) => {
  console.log("data: ", data);
  const [tongNo, setTongNo] = useState("");
  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Thông tin thu tiền",
  });

  useEffect(() => {
    Promise.all([
      getNoKhachHangUntilDate(data["SOPHIEU"], data["MAKH"], data["NGAYPHIEU"]),
    ])
      .then((values) => setTongNo(values[0]))
      .catch((err) => setTongNo(null));
  }, [data]);

  useLayoutEffect(() => {
    if (tongNo != "") {
      setShowModal(false);
      handelPrint();
    }
  }, [tongNo]);
  return (
    <div ref={componentRef} className={styles.print_page}>
      <h1>PHIẾU THU TIỀN</h1>
      <br />
      <br />
      <div className={styles.row}>
        <div>
          <label>Số phiếu:</label>
          <input value={data["SOPHIEU"]} />
        </div>
        <div>
          <label>Ngày:</label>
          <input value={convertDateForReport(data["NGAYPHIEU"])} />
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <label>Khách hàng:</label>
          <input style={{ "font-weight": "bold" }} value={data["TENKH"]} />
        </div>
        <div>
          <label>Nợ cũ:</label>
          <input
            style={{ "font-weight": "bold" }}
            value={parseFloat(tongNo).toLocaleString("en")}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <label>Số tiền:</label>
          <input value={parseFloat(data["THANHTIEN"]).toLocaleString("en")} />
        </div>
        <div>
          <label>Tổng nợ:</label>
          <input
            style={{ "font-weight": "bold" }}
            value={parseFloat(tongNo - data["THANHTIEN"]).toLocaleString("en")}
          />
        </div>
      </div>

      <div className={styles.row}>
        <label>Nội dung thu:</label>
        <textarea value={data["DIENGIAIPHIEU"]} />
      </div>

      <br />
      <br />
      <Signature fontSize={"1.6rem"} />
    </div>
  );
};

export default In;
