import styles from "./MyTable.module.scss";
const LIST_FORMAT_NUMBER = ["DONGIA", "THANHTIEN"];

const MyTable = ({ columns, data, width }) => {
  return (
    <div className={styles.my_table}>
      <table>
        <tr>
          {columns.map((col) => {
            return (
              <th style={{ width: col["width"], "table-layout": "fixed" }}>
                {col["header"]}
              </th>
            );
          })}
        </tr>
        {data.map((_data, index) => {
          return (
            <tr>
              {columns.map((col) => {
                let value = _data[col["key"]];
                let name_col = col["key"];
                if (
                  value &&
                  value != "Tổng cộng" &&
                  LIST_FORMAT_NUMBER.includes(name_col)
                ) {
                  value = parseFloat(value).toLocaleString("en");
                }
                if (index === data.length - 1)
                  return (
                    <td
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        width: col["width"],
                      }}
                    >
                      {value}
                    </td>
                  );
                return (
                  <td
                    style={{ textAlign: col["textAlign"], width: col["width"] }}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default MyTable;
