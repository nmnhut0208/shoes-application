import { useState, useEffect } from "react";
import SubTable from "./SubTable";
import styles from "./FormGiaoHang.module.scss";
// import { Header } from "antd/es/layout/layout";

const list_key = [
  { key: "Số đơn hàng" },
  { key: "Ngày đơn hàng" },
  { key: "Ngày giao hàng" },
  { key: "Diễn giải" },
  { key: "Số lượng còn lại" },
];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    header: list_key[obj]["key"],
    width: list_key[obj]["width"],
    accessorKey: list_key[obj]["key"],
    key: list_key[obj]["key"].toLowerCase(),
  };
  infoColumns.push(info);
}

const FormGiaoHang = () => {
  const [dataTable, setDataTable] = useState([]);
  const [dataTableSub, setDataTableSub] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  console.log("GiaoHang");

  useEffect(() => {
    const keys = Object.keys(rowSelection);
    console.log(keys);
    const data = [];
    for (var i = 0; i < keys.length; i++) {
      if (rowSelection[keys[i]] === true) {
        data.push(dataTable[keys[i]]);
        // console.log("data: ", dataTable[keys[i]]);
        // setDataTableSub([dataTable[keys[i]]]);
      }
    }
    setDataTableSub(data);
  }, [rowSelection]);

  useEffect(() => {
    fetch("http://localhost:8000/items_giao_hang")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataTable(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.left}>
          <label className={styles.title}>Đơn hàng</label>
          <div className={styles.left_row}>
            <label>Khách hàng</label>
            <input type="text" className={styles.small} />
            <input type="text" className={styles.medium} />
          </div>
        </div>
        <div className={styles.right}>
          <label className={styles.title}>Thông tin phiếu</label>
          <div className={styles.right_row}>
            <label>Số phiếu</label>
            <input type="text" className={styles.small} />
          </div>
          <div className={styles.right_row}>
            <label>Ngày phiếu</label>
            <input type="text" className={styles.small} />
          </div>
          <div className={styles.right_row}>
            <label>Diễn giải</label>
            <input type="text" className={styles.large} />
          </div>
        </div>
      </div>
      <header className={styles.header_table}>Danh sách đơn hàng</header>
      <SubTable
        columns={infoColumns}
        data={dataTable}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        maxHeight={"24rem"}
      />
      <header className={styles.header_table}>Chi tiết đơn hàng</header>
      <SubTable
        columns={infoColumns}
        data={dataTableSub}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        maxHeight={"26rem"}
      />
      <div className={styles.group_button}>
        <div>
          <button
          // onClick={handleSaveFrom}
          >
            Lưu
          </button>
          <button>Nhập tiếp</button>
          <button>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default FormGiaoHang;
