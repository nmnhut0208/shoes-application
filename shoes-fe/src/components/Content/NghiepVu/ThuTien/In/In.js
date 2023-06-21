import { useMemo, useRef, useState, useLayoutEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Signature } from "~common_tag/reports";

import styles from "./In.module.scss";

const In = ({ data, setShowModal }) => {
  console.log("data: ", data);
  const [tongNo, setTongNo] = useState(0);
  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Thông tin thu tiền",
  });
  useLayoutEffect(() => {
    handelPrint();
  }, []);
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
          <input value={data["NGAYPHIEU"]} />
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <label>Khách hàng:</label>
          <input value={data["TENKH"]} />
        </div>
        <div>
          <label>Nợ cũ:</label>
          <input input={data["NGAYPHIEU"]} />
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <label>Số tiền:</label>
          <input value={data["THANHTIEN"]} />
        </div>
        <div>
          <label>Tổng nợ:</label>
          <input value={tongNo} />
        </div>
      </div>

      <div className={styles.row}>
        <label>Nội dung thu:</label>
        <textarea value={data["DIENGIAIPHIEU"]} />
      </div>

      <br />
      <br />
      <Signature />
    </div>
  );
};

export default In;
