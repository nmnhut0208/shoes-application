import { useState, useEffect } from "react";
import SubTable from "./SubTable";
import styles from "./ChamCong.module.scss";
import { Popover } from "antd";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import MaterialReactTable from "material-react-table";
import { rem_to_px } from "~config/ui";

const list_key = [
  // { key: "STT" },
  { header: "Số phiếu", key: "phieupc" },
  { header: "Ngày phiếu", key: "NgayPhieu" },
  { header: "Diễn giải", key: "DienGiai" },
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
  { header: "Mã giày", key: "MAGIAY" },
  { header: "Tên giày", key: "TENGIAY" },
  { header: "Số lượng phân công", key: "SOLUONG" },
  { header: "Số lượng hoàn thành", key: "SOLUONG" },
];

const infoColumnsSub = [];
for (var obj in list_key_sub) {
  const info = {
    header: list_key_sub[obj]["header"],
    width: list_key_sub[obj]["width"],
    accessorKey: list_key_sub[obj]["key"],
    key: list_key_sub[obj]["key"],
  };
  infoColumnsSub.push(info);
}

const COL_KY = [
  {
    header: "Mã kỳ",
    key: "MAKY",
    width: 21 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Tên kỳ",
    key: "TENKY",
    width: 40 * rem_to_px,
    enableEditing: false,
  },
];

let columns_ky = processingInfoColumnTable(COL_KY);
const TableMaKY = ({ data, rowSelection, setRowSelection }) => {
  console.log("re-render sub table when hover", data);
  return (
    <div style={{ height: "auto" }}>
      <MaterialReactTable
        enableTopToolbar={false}
        columns={columns_ky}
        data={data}
        // components
        enableColumnActions={false}
        enableSorting={false}
        // enable phân trang
        enablePagination={false}
        enableBottomToolbar={true}
        // row selection
        enableMultiRowSelection={false}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
      />
    </div>
  );
};

const COL_NHANVIEN = [
  {
    header: "Mã nhân viên",
    key: "MANVIEN",
    width: 21 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Tên nhân viên",
    key: "TENNVIEN",
    width: 40 * rem_to_px,
    enableEditing: false,
  },
];

let columns_nvien = processingInfoColumnTable(COL_NHANVIEN);
const TableMaNVIEN = ({ data, rowSelection, setRowSelection }) => {
  console.log("re-render sub table when hover", data);
  return (
    <div style={{ height: "auto" }}>
      <MaterialReactTable
        enableTopToolbar={false}
        columns={columns_nvien}
        data={data}
        // components
        enableColumnActions={false}
        enableSorting={false}
        // enable phân trang
        enablePagination={false}
        enableBottomToolbar={true}
        // row selection
        enableMultiRowSelection={false}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
      />
    </div>
  );
};

const ChamCong = () => {
  const [dataTable, setDataTable] = useState([]);
  const [dataTableSub, setDataTableSub] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [dataTableKY, setDataTableKY] = useState([]);
  const [rowSelectionMaKY, setRowSelectionMaKY] = useState({});
  const [infoKY, setInfoKY] = useState({});
  const [dataTableNhanVien, setDataTableNhanVien] = useState([]);
  const [rowSelectionMaNVIEN, setRowSelectionMaNVIEN] = useState({});
  const [infoNVIEN, setInfoNVIEN] = useState({});
  // const [infoKH, setInfoKH] = useState({});
  // const infoKH = {
  //   MAKY: "02",
  //   MANVIEN: "LINH",
  // };

  // useEffect(() => {
  //   setInfoKH({
  //     MAKY: "02",
  //     MANVIEN: "linh",
  //   });
  // }, []);

  console.log("ChamCong", infoKY);

  useEffect(() => {
    let keys = Object.keys(rowSelectionMaKY);
    if (keys.length > 0) {
      // setFormInfoDonHang({
      //   ...formInfoDonHang,
      //   MAKH: dataTableKhachHang[keys[0]]["MAKH"],
      //   TENKH: dataTableKhachHang[keys[0]]["TENKH"],
      // });
      const info = {
        MAKY: dataTableKY[keys[0]]["MAKY"],
        TENKY: dataTableKY[keys[0]]["TENKY"],
      };
      setInfoKY(info);
      setDataTable([]);
      setDataTableSub([]);
      setRowSelection({});
    }
  }, [rowSelectionMaKY]);

  useEffect(() => {
    fetch("http://localhost:8000/chamcong/ky")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log("info khach hang: ", info);
        setDataTableKY(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  useEffect(() => {
    let keys = Object.keys(rowSelectionMaNVIEN);
    if (keys.length > 0) {
      // setFormInfoDonHang({
      //   ...formInfoDonHang,
      //   MAKH: dataTableKhachHang[keys[0]]["MAKH"],
      //   TENKH: dataTableKhachHang[keys[0]]["TENKH"],
      // });
      const info = {
        MANVIEN: dataTableNhanVien[keys[0]]["MANVIEN"],
        TENNVIEN: dataTableNhanVien[keys[0]]["TENNVIEN"],
      };
      setInfoNVIEN(info);
      setDataTable([]);
      setDataTableSub([]);
      setRowSelection({});
    }
  }, [rowSelectionMaNVIEN]);

  useEffect(() => {
    fetch("http://localhost:8000/chamcong/nhanvien")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log("info khach hang: ", info);
        setDataTableNhanVien(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  useEffect(() => {
    const keys = Object.keys(rowSelection);
    if (keys.length === 0) {
      setDataTableSub([]);
      return;
    }
    // console.log("chamcong: ", keys, dataTable[keys[0]]);
    const data = [];
    for (var i = 0; i < keys.length; i++) {
      if (rowSelection[keys[i]] === true) {
        data.push(dataTable[keys[i]]["phieupc"]);
        //     // console.log("data: ", dataTable[keys[i]]);
        //     // setDataTableSub([dataTable[keys[i]]]);
      }
    }
    const send_data = {
      MANVIEN: infoNVIEN["MANVIEN"],
      MAKY: infoKY["MAKY"],
      PHIEUPC: data,
    };
    fetch("http://localhost:8000/chamcong/" + infoNVIEN["MANVIEN"], {
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
        setDataTableSub(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
    // console.log("data: ", data);
    // setDataTableSub(data);
  }, [rowSelection]);

  useEffect(() => {
    if (infoNVIEN["MANVIEN"] == undefined || infoKY["MAKY"] == undefined) {
      return;
    }
    const send_data = {
      MANVIEN: infoNVIEN["MANVIEN"],
      MAKY: infoKY["MAKY"],
    };

    fetch("http://localhost:8000/chamcong", {
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
        setDataTable(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, [infoKY, infoNVIEN]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.left}>
          {/* <label className={styles.title}>Đơn hàng</label> */}
          <div className={styles.left_row}>
            <label>Mã kỳ</label>

            <Popover
              placement="bottomLeft"
              content={
                <TableMaKY
                  setRowSelection={setRowSelectionMaKY}
                  rowSelection={rowSelectionMaKY}
                  data={dataTableKY}
                />
              }
            >
              <input
                value={infoKY["MAKY"]}
                type="text"
                className={styles.small}
              />
            </Popover>
            <input
              value={infoKY["TENKY"]}
              type="text"
              className={styles.medium}
            />
          </div>
          <div className={styles.left_row}>
            <label>Mã nhân viên</label>
            <Popover
              placement="bottomLeft"
              content={
                <TableMaNVIEN
                  setRowSelection={setRowSelectionMaNVIEN}
                  rowSelection={rowSelectionMaNVIEN}
                  data={dataTableNhanVien}
                />
              }
            >
              <input
                value={infoNVIEN["MANVIEN"]}
                type="text"
                className={styles.small}
              />
            </Popover>
            <input
              value={infoNVIEN["TENNVIEN"]}
              type="text"
              className={styles.medium}
            />
          </div>
        </div>
        <div className={styles.right}>
          {/* <label className={styles.title}>Thông tin phiếu</label> */}
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
      <header className={styles.header_table}>Phiếu phân công</header>
      <SubTable
        columns={infoColumns}
        data={dataTable}
        rowSelection={rowSelection}
        flag_rowSelection={true}
        setRowSelection={setRowSelection}
        maxHeight={"24rem"}
      />
      <header className={styles.header_table}>Chi tiết phiếu phân công</header>
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
          <button>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default ChamCong;
