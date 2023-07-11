import { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";

import { useReactToPrint } from "react-to-print";
import { convertDateForReport } from "~utils/processing_date";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import {
  INFO_TABLE,
  dictInfoPrint,
  INFO_TABLE_FOOTER,
} from "./ConstantVariable";
import styles from "./In.module.scss";
import MyTable from "./MyTable";

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
  let total = 0;
  for (let i in data) {
    let info = {};
    info["DONGIA"] = i;
    info["SOLUONG"] = data[i].reduce((init, obj) => init + obj["SOLUONG"], 0);
    total += info["SOLUONG"];
    footer_info.push(info);
  }
  footer_info.push({ DONGIA: "Tổng cộng", SOLUONG: total });
  console.log("footer_info: ", footer_info);
  return footer_info;
};

const In = ({ data, setShowModal }) => {
  const [columns, setColumns] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [infoEachEmployer, setInfoEachEmployer] = useState([]);

  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Đơn hàng",
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
      const heightA4 = 1122 - dictInfoPrint["header"];
      const groupByEmployer = groupbyFunction(dataTable, "MANVIEN");
      const groupByDONGIA = groupbyFunction(dataTable, "DONGIA");
      const footer = compute_footer_SOLUONG(groupByDONGIA);
      console.log("footer: ", footer);

      let all_pages = [];
      const size_header_table = dictInfoPrint["content"]["header_table"];
      const size_each_line = dictInfoPrint["content"]["each_row_table"];
      for (let key in groupByEmployer) {
        let page = { MANVIEN: key };

        let end_line = {};
        end_line["MAGIAY"] = "Cộng " + groupByEmployer[key][0]["TENNVIEN"];
        end_line["SOLUONG"] = 0;
        end_line["THANHTIEN"] = 0;
        for (let i = 0; i < groupByEmployer[key].length; i++) {
          end_line["SOLUONG"] += groupByEmployer[key][i]["SOLUONG"];
          end_line["THANHTIEN"] += groupByEmployer[key][i]["THANHTIEN"];
        }
        page["table"] = [...groupByEmployer[key], end_line];
        const dongia_group = groupbyFunction(groupByEmployer[key], "DONGIA");
        page["footer"] = compute_footer_SOLUONG(dongia_group);
        // Compute margin
        let size_table_detail =
          size_header_table + page["table"].length * size_each_line;
        let size_table_overview =
          size_header_table + page["footer"].length * size_each_line;

        let add_margin =
          heightA4 - size_table_detail - size_table_overview - 10;

        page["margin-bottom"] = add_margin;
        all_pages.push(page);
      }
      console.log("all_pages: ", all_pages);
      setInfoEachEmployer(all_pages);
    }
  }, [dataTable]);

  useLayoutEffect(() => {
    if (infoEachEmployer.length > 0) {
      // setShowModal(false);
      handelPrint();
    }
  }, [infoEachEmployer]);

  return (
    <div ref={componentRef} className={styles.print_page} id="print_content">
      {infoEachEmployer.length > 0 &&
        infoEachEmployer.map((page, index) => {
          return (
            <div className={styles.each_page}>
              <h1>BẢNG LƯƠNG</h1>
              <h2>{data["TENKY"]}</h2>
              <h2>Tên thợ: {page["table"][0]["TENNVIEN"]}</h2>
              <MyTable
                columns={INFO_TABLE}
                data={page["table"]}
                width="1040px"
              />
              <br />
              <MyTable
                columns={INFO_TABLE_FOOTER}
                data={page["footer"]}
                width={"200px"}
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
