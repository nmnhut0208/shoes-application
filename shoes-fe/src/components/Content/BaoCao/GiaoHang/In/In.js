import { useRef, useState, useLayoutEffect, useEffect } from "react";

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
    var url = "http://localhost:8000/giaohang/get_all_info_giaohang?";
    let params = new URLSearchParams(url.search);

    for (const [key, value] of Object.entries(data)) {
      console.log(`Key: ${key}, Value: ${value}`);
      params.append(key, value);
    }
    fetch(url + params.toString(), {
      method: "get",
    })
      .then((response) => response.json())
      .then((info) => {
        if (!Array.isArray(info)) {
          setDataTable([]);
        }
        else {
          setDataTable(info);
        }
      })
      .catch((error) => {
        console.log("error: ", error)
      });
  }, [data]);

  useEffect(() => {
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
      <h1>BÁO CÁO GIAO HÀNG</h1>
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
