import { useState, useEffect } from "react";
import SubTable from "./SubTable";
import styles from "./ChamCong.module.scss";
import { Popover } from "antd";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import MaterialReactTable from "material-react-table";
import { rem_to_px } from "~config/ui";
import { convertDate } from "~utils/processing_date";
import moment from "moment";
import { useUserContext, actions } from "~user";

const list_key = [
  // { key: "STT" },
  { header: "Số phiếu", key: "SOPHIEU" },
  { header: "Ngày phiếu", key: "NGAYPHIEU" },
  { header: "Diễn giải", key: "DIENGIAI" },
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
  { header: "Tên giày", key: "tengiay" },
  { header: "Số lượng phân công", key: "SLPHANCONG" },
  { header: "Số lượng hoàn thành", key: "SLCHAMCONG" },
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
        muiTableContainerProps={{ sx: { maxHeight: "400px" } }}
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
        muiTableContainerProps={{ sx: { maxHeight: "400px" } }}
      />
    </div>
  );
};

const ChamCong = () => {
  const [userState, userDispatch] = useUserContext();
  const [dataTable, setDataTable] = useState([]);
  const [dataTableSub, setDataTableSub] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [dataTableKY, setDataTableKY] = useState([]);
  const [rowSelectionMaKY, setRowSelectionMaKY] = useState({});
  // const [infoKY, setInfoKY] = useState({});
  const [dataTableNhanVien, setDataTableNhanVien] = useState([]);
  const [rowSelectionMaNVIEN, setRowSelectionMaNVIEN] = useState({});
  // const [infoNVIEN, setInfoNVIEN] = useState({});
  const maForm = "F0043";
  const [infoForm, setInfoForm] = useState({
    MAKY: "",
    TENKY: "",
    MANVIEN: "",
    TENNVIEN: "",
    NGAYPHIEU: moment().format("YYYY-MM-DD HH:mm:ss"),
    DIENGIAI: "",
    SOPHIEU: "",
  });
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

  console.log("ChamCong", infoForm["MAKY"]);

  const handleSave = () => {
    if (
      userState.userPoolAccess.some(
        (obj) => obj.MAFORM === maForm && obj.THEM === 1
      )
    ) {
      const send_data = {
        MAKY: infoForm["MAKY"],
        MANVIEN: infoForm["MANVIEN"],
        NGAYPHIEU: infoForm["NGAYPHIEU"],
        DIENGIAI: infoForm["DIENGIAI"],
        SOPHIEU: infoForm["SOPHIEU"],
        data: dataTableSub,
      };
      fetch("http://localhost:8000/savechamcong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(send_data),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data["status"] === "success") {
            alert("Lưu thành công");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Bạn không có quyền thêm");
    }
  };

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
      // setInfoKY(info);
      setInfoForm({ ...infoForm, ...info });
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
      // setInfoNVIEN(info);
      setInfoForm({ ...infoForm, ...info });
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
        data.push(dataTable[keys[i]]["SOPHIEU"]);
        setInfoForm({ ...infoForm, SOPHIEU: dataTable[keys[i]]["SOPHIEU"] });
        //     // console.log("data: ", dataTable[keys[i]]);
        //     // setDataTableSub([dataTable[keys[i]]]);
      }
    }
    const send_data = {
      MANVIEN: infoForm["MANVIEN"],
      MAKY: infoForm["MAKY"],
      PHIEUPC: data,
    };
    fetch("http://localhost:8000/chamcong/" + infoForm["MANVIEN"], {
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
    if (
      infoForm["MANVIEN"] == undefined ||
      infoForm["MAKY"] == undefined ||
      infoForm["MANVIEN"] == "" ||
      infoForm["MAKY"] == ""
    ) {
      return;
    }
    const send_data = {
      MANVIEN: infoForm["MANVIEN"],
      MAKY: infoForm["MAKY"],
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
  }, [infoForm]);

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
                value={infoForm["MAKY"]}
                type="text"
                className={styles.small}
              />
            </Popover>
            <input
              value={infoForm["TENKY"]}
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
                value={infoForm["MANVIEN"]}
                type="text"
                className={styles.small}
              />
            </Popover>
            <input
              value={infoForm["TENNVIEN"]}
              type="text"
              className={styles.medium}
            />
          </div>
        </div>
        <div className={styles.right}>
          {/* <label className={styles.title}>Thông tin phiếu</label> */}
          <div className={styles.right_row}>
            <label>Ngày phiếu</label>
            <input
              type="date"
              value={convertDate(infoForm["NGAYPHIEU"])}
              onChange={(e) => {
                setInfoForm({ ...infoForm, NGAYPHIEU: e.target.value });
              }}
              className={styles.small}
            />
          </div>
          <div className={styles.right_row}>
            <label>Diễn giải</label>
            <input
              type="text"
              onChange={(e) => {
                setInfoForm({ ...infoForm, DIENGIAI: e.target.value });
              }}
              className={styles.large}
            />
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
          <button onClick={handleSave}>Lưu</button>
          <button>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default ChamCong;
