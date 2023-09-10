import { useRef, useState, useLayoutEffect } from "react";
import { useReactToPrint } from "react-to-print";
import {
  INFO_TABLE,
  INFO_TABLE_FOOTER,
  LIST_FORMAT_NUMBER,
} from "./ConstantVariable";
import styles from "./In.module.scss";
import { TableToPrint } from "~common_tag/reports";

const groupbyFunction = (data, key) => {
  let list_key = [];
  let result = {};
  for (let i = 0; i < data.length; i++) {
    let unique_key = data[i][key];
    if (list_key.includes(unique_key)) {
      continue;
    }
    result[unique_key] = data.filter((_data) => _data[key] === unique_key);
    list_key.push(unique_key);
  }
  return result;
};

const compute_footer_SOLUONG = (data) => {
  let footer_info = [];
  for (let i in data) {
    let info = {};
    info["DONGIA"] = i;
    info["SOLUONG"] = data[i].reduce((init, obj) => init + obj["SOLUONG"], 0);
    footer_info.push(info);
  }
  console.log("footer_info: ", footer_info);
  return footer_info;
};

const In = ({ data, setShowModal, stylePrint }) => {
  const [dataTable, setDataTable] = useState([]);
  const [infoEachEmployer, setInfoEachEmployer] = useState([]);

  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Bảng lương",
    removeAfterPrint: true,
  });

  useLayoutEffect(() => {
    fetch(
      "http://localhost:8000/chamcong/salary_compute?" +
      `MAKY=${data["MAKY"]}&TYPE=${data["TYPE"]}`
    )
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
      const groupByEmployer = groupbyFunction(dataTable, "MANVIEN");
      const groupByDONGIA = groupbyFunction(dataTable, "DONGIA");
      const footer = compute_footer_SOLUONG(groupByDONGIA);
      console.log("footer: ", footer);

      let all_pages = [];
      for (let key in groupByEmployer) {
        let page = { MANVIEN: key };
        page["table"] = groupByEmployer[key];
        const dongia_group = groupbyFunction(groupByEmployer[key], "DONGIA");
        page["footer"] = compute_footer_SOLUONG(dongia_group);

        all_pages.push(page);
      }
      console.log("all_pages: ", all_pages);
      setInfoEachEmployer(all_pages);
    }
  }, [dataTable]);

  useLayoutEffect(() => {
    if (infoEachEmployer.length > 0) {

      if (Object.keys(stylePrint).length == 0) { setShowModal(false); handelPrint() };
    }
  }, [infoEachEmployer]);

  return (
    <div
      ref={componentRef}
      className={styles.print_page}
      id="print_content"
      style={{ ...stylePrint }}
    >
      {infoEachEmployer.length > 0 &&
        infoEachEmployer.map((page, index) => {
          return (
            <div className={styles.each_page}>
              <h1>BẢNG LƯƠNG</h1>
              <h2>{data["TENKY"]}</h2>
              <h2>Tên thợ: {page["table"][0]["TENNVIEN"]}</h2>
              <TableToPrint
                columns={INFO_TABLE}
                data={page["table"]}
                listHaveFooterSum={["SOLUONG", "THANHTIEN"]}
                LIST_FORMAT_NUMBER={LIST_FORMAT_NUMBER}
                Col_Name_Footer="MAGIAY"
              />
              <br />
              <TableToPrint
                columns={INFO_TABLE_FOOTER}
                data={page["footer"]}
                listHaveFooterSum={["SOLUONG"]}
                LIST_FORMAT_NUMBER={["SOLUONG", "DONGIA"]}
                Col_Name_Footer="DONGIA"
              />

              {index !== infoEachEmployer.length - 1 && (
                <div className={styles.pagebreak}> </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default In;
