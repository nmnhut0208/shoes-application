import styles from "./MyTable.module.scss";

const listGroupBy = ["SODH", "TENKH", "NGAYDH"];

const MyTable = ({ columns, data }) => {
  console.log("columns: ", columns);
  console.log("data: ", data);
  return (
    <div className={styles.my_table}>
      <table width="1095px">
        <tr>
          {columns.map((col) => {
            return <th style={{ width: col["size"] }}>{col["header"]}</th>;
          })}
        </tr>
        {data.map((_data, index) => {
          return (
            <tr>
              {columns.map((col) => {
                let value = _data[col["accessorKey"]];
                let name_col = col["accessorKey"];
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
                return <td>{value}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default MyTable;
