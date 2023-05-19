import { useState, useEffect, useMemo } from "react";
import SubTable from "./SubTable";
import styles from "./GiaoHang.module.scss";
// import { Header } from "antd/es/layout/layout";

const list_key = [
  { header: "Số đơn hàng", key: "SODH", width: "10rem" },
  { header: "Ngày đơn hàng", key: "NGAYDH", width: "10rem" },
  { header: "Ngày giao hàng", key: "NGAYGH", width: "10rem" },
  { header: "Diễn giải", key: "DIENGIAIPHIEU", width: "10rem" },
  { header: "Số lượng còn lại", key: "SOLUONGCONLAI", width: "10rem" },
];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    header: list_key[obj]["header"],
    width: list_key[obj]["width"],
    accessorKey: list_key[obj]["key"],
    key: list_key[obj]["key"],
  };
  infoColumns.push(info);
}

const list_key_sub = [
  { header: "Mã Giày", key: "MAGIAY", width: "10rem" },
  { header: "Tên Giày", key: "TENGIAY", width: "10rem" },
  { header: "Màu Đế", key: "MAUDE", width: "10rem" },
  { header: "Màu Gót", key: "MAUGOT", width: "10rem" },
  { header: "Màu Sườn", key: "MAUSUON", width: "10rem" },
  { header: "Màu Cá", key: "MAUCA", width: "10rem" },
  { header: "Màu Quai", key: "MAUQUAI", width: "10rem" },
  { header: "Size 5", key: "SIZE5", width: "10rem" },
  { header: "Size 6", key: "SIZE6", width: "10rem" },
  { header: "Size 7", key: "SIZE7", width: "10rem" },
  { header: "Size 8", key: "SIZE8", width: "10rem" },
  { header: "Size 9", key: "SIZE9", width: "10rem" },
  { header: "Số lượng", key: "SOLUONG", width: "10rem" },
  { header: "Giá bán", key: "GIABAN", width: "10rem" },
  { header: "Thành tiền", key: "THANHTIEN", width: "10rem" },
  { header: "Diễn giải", key: "DIENGIAIDONG", width: "10rem" },
];

const COLS_HAVE_SUM_FOOTER = [
  "SIZE5",
  "SIZE6",
  "SIZE7",
  "SIZE8",
  "SIZE9",
  "SIZE0",
  "SOLUONG",
  "THANHTIEN",
];

const GiaoHang = () => {
  const [dataTable, setDataTable] = useState([]);
  const [dataTableSub, setDataTableSub] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const test_makh = "THU";

  console.log("GiaoHang");

  useEffect(() => {
    const keys = Object.keys(rowSelection);
    // console.log("keys row: ", dataTable[keys[0]]);
    let data = [];
    for (var i = 0; i < keys.length; i++) {
      if (rowSelection[keys[i]] === true) {
        data.push(dataTable[keys[i]]["SODH"]);
        // console.log("data: ", dataTable[keys[i]]);
        // setDataTableSub([dataTable[keys[i]]]);
        // const send_data = {
        //   sodh: dataTable[keys[i]]["SODH"],
        //   makh: test_makh,
        // };
      }
    }
    const send_data = {
      sodh: data,
      makh: test_makh,
    };
    if (data.length === 0) {
      setDataTableSub([]);
      return;
    }
    fetch("http://localhost:8000/giaohang/" + test_makh, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send_data),
    })
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log("info: ", info);
        setDataTableSub(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
    console.log("sub: ", data);
    setDataTableSub([...data]);
  }, [rowSelection]);

  const infoColumnsSub = useMemo(() => {
    const infoColumnsSubInit = [];
    for (var obj in list_key_sub) {
      const info = {
        header: list_key_sub[obj]["header"],
        width: list_key_sub[obj]["width"],
        accessorKey: list_key_sub[obj]["key"],
        key: list_key_sub[obj]["key"],
      };
      if (list_key_sub[obj]["key"] === "TENGIAY")
        info["Footer"] = () => <div>Tổng cộng</div>;
      if (COLS_HAVE_SUM_FOOTER.includes(list_key_sub[obj]["key"])) {
        let sum_value = dataTableSub.reduce(
          (total, row) => total + row[list_key_sub[obj]["key"]],
          0
        );
        info["Footer"] = () => <div>{sum_value}</div>;
      }
      infoColumnsSubInit.push(info);
    }
    return infoColumnsSubInit;
  }, [dataTableSub]);

  useEffect(() => {
    fetch("http://localhost:8000/giaohang")
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
            <input type="text" className={styles.small} value={test_makh} />
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
        flag_rowSelection={true}
        setRowSelection={setRowSelection}
        maxHeight={"24rem"}
      />
      <header className={styles.header_table}>Chi tiết đơn hàng</header>
      <SubTable
        columns={infoColumnsSub}
        data={dataTableSub}
        rowSelection={{}}
        flag_rowSelection={false}
        // setRowSelection={setRowSelection}
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

export default GiaoHang;
