import { useRef, useState, useLayoutEffect } from "react";

import { useReactToPrint } from "react-to-print";
import { convertDateForReport } from "~utils/processing_date";
import { INFO_TABLE } from "./ConstantVariable";
import styles from "./In.module.scss";
import MyTable from "./MyTable";

const In = ({ data, setShowModal, stylePrint }) => {
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
        setDataTable(info);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  useLayoutEffect(() => {
    if (dataTable.length > 0) {
      if (Object.keys(stylePrint).length == 0) {
        setShowModal(false);
        handelPrint();
      }
    }
  }, [dataTable]);

  return (
    <div
      ref={componentRef}
      className={styles.print_page}
      id="print_content"
      style={{ ...stylePrint }}
    >
      <h1>BÁO CÁO ĐƠN HÀNG</h1>
      <div className={styles.info_time}>
        <label>Từ ngày </label>
        <label>{convertDateForReport(data["DATE_FROM"])} </label>
        <label>đến ngày</label>
        <label>{convertDateForReport(data["DATE_TO"])} </label>
      </div>

      <MyTable columns={INFO_TABLE} data={dataTable} />
    </div>
  );
};

export default In;
