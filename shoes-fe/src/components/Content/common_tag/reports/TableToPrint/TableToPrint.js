import { useMemo } from "react";
import { convertDateForReport } from "~utils/processing_date";
import styles from "./TableToPrint.module.scss";

const TableToPrint = ({
  columns,
  data,
  LIST_FORMAT_NUMBER, // list những key mà cần format theo number
  listHaveFooterSum, // list những cột cần group
  listColDate, // format ngày 23/12/2023
  Col_Name_Footer, // key nào in muốn chữ tổng cộng hiện ra => string
}) => {
  const footer = useMemo(() => {
    let _footer = {};
    if (listHaveFooterSum && listHaveFooterSum.length > 0) {
      for (let i = 0; i < listHaveFooterSum.length; i++) {
        _footer[listHaveFooterSum[i]] = 0;
      }
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < listHaveFooterSum.length; j++) {
          _footer[listHaveFooterSum[j]] += data[i][listHaveFooterSum[j]];
        }
      }
    }

    return _footer;
  }, [data]);

  return (
    <div className={styles.my_table}>
      <table style={{ width: "fit-content" }}>
        {/* Header table */}
        <tr>
          {columns.map((col) => {
            return <th style={{ width: col["width"] }}>{col["header"]}</th>;
          })}
        </tr>
        {/* Body table */}
        {data.map((_data, index) => {
          return (
            <tr>
              {columns.map((col) => {
                let value = _data[col["key"]];
                let name_col = col["key"];
                if (
                  LIST_FORMAT_NUMBER &&
                  value &&
                  LIST_FORMAT_NUMBER.includes(name_col)
                )
                  value = parseFloat(value).toLocaleString("en");

                if (
                  listColDate &&
                  listColDate.includes(name_col) &&
                  value != ""
                )
                  value = convertDateForReport(value);
                return (
                  <td
                    style={{
                      width: col["width"],
                      height: col["height"],
                      textAlign: col["textAlign"],
                    }}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          );
        })}
        {/* Footer - có tổng theo cột */}
        {listHaveFooterSum && listHaveFooterSum.length > 0 && (
          <tr>
            {columns.map((col) => {
              let value = footer[col["key"]];
              if (value === undefined) {
                if (col["key"] === Col_Name_Footer)
                  return <th style={{ width: col["width"] }}>Tổng cộng</th>;
                else value = "";
              }
              if (value != "") value = parseFloat(value).toLocaleString("en");
              return (
                <th style={{ width: col["width"], textAlign: "right" }}>
                  {value}
                </th>
              );
            })}
          </tr>
        )}
      </table>
    </div>
  );
};

export default TableToPrint;
