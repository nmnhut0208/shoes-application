import { useMemo, useState } from "react";
import styles from "./MyTable.module.scss";
import { convertDateForReport } from "~utils/processing_date";

const listGroupBy = ["SODH", "TENKH", "NGAYDH"];
const listHaveFooter = [
  "SIZE0",
  "SIZE1",
  "SIZE5",
  "SIZE6",
  "SIZE7",
  "SIZE8",
  "SIZE9",
  "SOLUONG",
  "THANHTIEN",
];

const MyTable = ({ columns, data }) => {
  const footer = useMemo(() => {
    let _footer = {};
    for (let i = 0; i < listHaveFooter.length; i++) {
      _footer[listHaveFooter[i]] = 0;
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < listHaveFooter.length; j++) {
        _footer[listHaveFooter[j]] += data[i][listHaveFooter[j]];
      }
    }
    return _footer;
  }, [data]);

  console.log("footer: ", footer);

  return (
    <div className={styles.my_table}>
      <table width="1095px">
        <tr>
          {columns.map((col) => {
            return <th style={{ width: col["width"] }}>{col["header"]}</th>;
          })}
        </tr>
        {data.map((_data, index) => {
          return (
            <tr>
              {columns.map((col) => {
                let value = _data[col["key"]];
                let name_col = col["key"];
                if (index > 0 && listGroupBy.includes(name_col)) {
                  let old_dh = true;
                  for (let i in listGroupBy) {
                    if (
                      _data[listGroupBy[i]] !== data[index - 1][listGroupBy[i]]
                    ) {
                      old_dh = false;
                      break;
                    }
                  }
                  if (old_dh) value = "";
                }
                if (name_col === "NGAYDH" && value != "")
                  value = convertDateForReport(value);
                return <td style={{ textAlign: col["textAlign"] }}>{value}</td>;
              })}
            </tr>
          );
        })}
        <tr>
          {columns.map((col) => {
            let value = footer[col["key"]];
            console.log("value: ", value);
            if (value === undefined) {
              if (col["key"] === "TENGIAY") return <th>Tổng cộng</th>;
              else value = "";
            }
            return <th style={{ textAlign: "right" }}>{value}</th>;
          })}
        </tr>
      </table>
    </div>
  );
};

export default MyTable;
