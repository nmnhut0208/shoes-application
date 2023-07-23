import { useState, useEffect, useMemo } from "react";
import { Popover } from "antd";
import moment from "moment";
import SubTable from "./SubTable";
import styles from "./FormGiaoHang.module.scss";
import { convertDate } from "~utils/processing_date";
import { useUserContext } from "~user";
import TableMaKH from "./TableMaKH";
import { rem_to_px } from "~config/ui";
import {
  processingInfoColumnTable,
  processingInfoColumnTableHaveFooter,
} from "~utils/processing_data_table";
import { convertDateForReport } from "~utils/processing_date";

const list_key = [
  {
    header: "Số đơn hàng",
    key: "SODH",
    width: 10 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Ngày đơn hàng",
    key: "NGAYDH",
    width: 5 * rem_to_px,
    enableEditing: false,
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  {
    header: "Ngày giao hàng",
    key: "NGAYGH",
    width: 5 * rem_to_px,
    enableEditing: false,
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  {
    header: "Diễn giải",
    key: "DIENGIAIDONG",
    width: 20 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Số lượng còn lại",
    key: "SOLUONGCONLAI",
    width: 5 * rem_to_px,
    enableEditing: false,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
];

const infoColumns = processingInfoColumnTable(list_key);

const list_key_sub = [
  {
    header: "Mã Giày",
    key: "MAGIAY",
    width: 21 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Tên Giày",
    key: "TENGIAY",
    width: 35 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu Đế",
    key: "MAUDE",
    width: 10 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu Gót",
    key: "MAUGOT",
    width: 10 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu Sườn",
    key: "MAUSUON",
    width: 10 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu Cá",
    key: "MAUCA",
    width: 10 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu Quai",
    key: "MAUQUAI",
    width: 10 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Size 5",
    key: "SIZE5",
    width: 8 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Size 6",
    key: "SIZE6",
    width: 8 * rem_to_px,
    enableEditing: true,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  {
    header: "Size 7",
    key: "SIZE7",
    width: 8 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Size 8",
    key: "SIZE8",
    width: 8 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Size 9",
    key: "SIZE9",
    width: 8 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Size 0",
    key: "SIZE0",
    width: 8 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Size 1",
    key: "SIZE1",
    width: 8 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Số lượng",
    key: "SOLUONG",
    width: 8 * rem_to_px,
    enableEditing: false,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  {
    header: "Giá bán",
    key: "GIABAN",
    width: 10 * rem_to_px,
    enableEditing: false,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  {
    header: "Thành tiền",
    key: "THANHTIEN",
    width: 10 * rem_to_px,
    enableEditing: false,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  {
    header: "Diễn giải",
    key: "DIENGIAIDONG",
    width: 30 * rem_to_px,
    enableEditing: false,
  },
];

const COLS_HAVE_SUM_FOOTER = [
  "SIZE5",
  "SIZE6",
  "SIZE7",
  "SIZE8",
  "SIZE9",
  "SIZE0",
  "SIZE1",
  "SOLUONG",
  "THANHTIEN",
];

const FormGiaoHang = ({ setIsSaveDataNghiepVuGiaoHang, permission }) => {
  console.log("=====infoColumns: ", infoColumns);

  const [userState, userDispatch] = useUserContext();
  const [dataTable, setDataTable] = useState([]);
  const [dataTableSub, setDataTableSub] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [rowSelectionSub, setRowSelectionSub] = useState({});
  // const test_makh = "THU";
  const [dataTableKhachHang, setDataTableKhachHang] = useState([]);
  const [rowSelectionMaKH, setRowSelectionMaKH] = useState({});
  const [infoKH, setInfoKH] = useState({});
  // const maForm = "F0034";
  const [infoForm, setInfoForm] = useState({
    SOPHIEU: "",
    LastestGH: "",
    DIENGIAI: "",
    NGAYPHIEU: "",
  });

  const handleSave = () => {
    if (
      // userState.userPoolAccess.some(
      //   (obj) => obj.MAFORM === maForm && obj.THEM === 1
      // )
      permission.THEM === 1
    ) {
      const keys = Object.keys(rowSelectionSub);
      const data = [];
      for (var i = 0; i < keys.length; i++) {
        if (rowSelectionSub[keys[i]] === true) {
          data.push(dataTableSub[keys[i]]);
        }
      }
      // console.log("size1: ", data);
      const send_data = {
        data: data,
        makh: infoKH.MAKH,
        sophieu: infoForm.SOPHIEU,
        diengiai: infoForm.DIENGIAI,
        user: userState.userName,
      };
      fetch("http://localhost:8000/savegiaohang", {
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
          console.log("data: ", data);
          if (data["status"] == "success") {
            fetch("http://localhost:8000/hethong/giaohang/SOPHIEU", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ LASTNUMBER: infoForm.LastestGH }),
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log("data: ", data);
                if (data["status"] == "success") {
                  setIsSaveDataNghiepVuGiaoHang(true);
                  alert("Lưu thành công");
                } else {
                  alert("Lưu thất bại");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            alert("Lưu thất bại");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Bạn không có quyền thêm");
    }
  };

  const handleNhapTiep = () => {
    setDataTable([]);
    setDataTableSub([]);
    setRowSelection({});
    setRowSelectionMaKH({});
    setInfoKH({});
    setInfoForm({
      ...infoForm,
      SOPHIEU: infoForm.SOPHIEU,
      LastestGH: infoForm.LastestGH,
      DIENGIAI: "",
      NGAYPHIEU: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    setIsSaveDataNghiepVuGiaoHang(true);
  };

  useEffect(() => {
    fetch("http://localhost:8000/hethong/giaohang/SOPHIEU")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log("info don hang: ", info);
        // setDataTable(info);
        setInfoForm({
          ...infoForm,
          SOPHIEU: info["SOPHIEU"],
          LastestGH: info["LastestGH"],
          DIENGIAI: "",
          NGAYPHIEU: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
        setRowSelection({});
        setDataTableSub([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rowSelectionMaKH]);

  useEffect(() => {
    let keys = Object.keys(rowSelectionMaKH);
    if (keys.length > 0) {
      // setFormInfoDonHang({
      //   ...formInfoDonHang,
      //   MAKH: dataTableKhachHang[keys[0]]["MAKH"],
      //   TENKH: dataTableKhachHang[keys[0]]["TENKH"],
      // });
      const info = {
        MAKH: dataTableKhachHang[keys[0]]["MAKH"],
        TENKH: dataTableKhachHang[keys[0]]["TENKH"],
      };
      setInfoKH(info);
    }
  }, [rowSelectionMaKH]);

  useEffect(() => {
    fetch("http://localhost:8000/khachhang")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log("info khach hang: ", info);
        setDataTableKhachHang(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  useEffect(() => {
    console.log("info kh: ", infoKH["MAKH"]);
    if (infoKH["MAKH"] == undefined || infoKH["MAKH"] == "") {
      return;
    }
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
      makh: infoKH["MAKH"],
    };
    if (data.length === 0) {
      setDataTableSub([]);
      return;
    }
    fetch("http://localhost:8000/giaohang/" + infoKH["MAKH"], {
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
    // console.log("sub: ", data);
    // setDataTableSub([...data]);
  }, [rowSelection]);

  const infoColumnsSub = useMemo(() => {
    const infoColumnsSubInit = processingInfoColumnTableHaveFooter(
      list_key_sub,
      COLS_HAVE_SUM_FOOTER,
      dataTableSub,
      false
    );
    return infoColumnsSubInit;
  }, [dataTableSub]);

  console.log("infoColumnsSub: ", infoColumnsSub);

  useEffect(() => {
    if (infoKH["MAKH"] == undefined || infoKH["MAKH"] == "") {
      // setDataTable([]);
      return;
    }
    fetch("http://localhost:8000/giaohang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoKH),
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
  }, [infoKH]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.left}>
          <label className={styles.title}>Đơn hàng</label>
          <div className={styles.left_row}>
            <label>Khách hàng</label>
            {/* <input type="text" className={styles.small} value={test_makh} /> */}
            <Popover
              placement="bottomLeft"
              content={
                <TableMaKH
                  data={dataTableKhachHang}
                  rowSelection={rowSelectionMaKH}
                  setRowSelection={setRowSelectionMaKH}
                  setIsSaveData={setIsSaveDataNghiepVuGiaoHang}
                />
              }
            >
              <input
                name="MAKH"
                value={infoKH["MAKH"] ? infoKH["MAKH"] : ""}
                readOnly={true}
              />
            </Popover>
            <input
              type="text"
              className={styles.medium}
              value={infoKH["TENKH"] ? infoKH["TENKH"] : ""}
            />
          </div>
        </div>
        <div className={styles.right}>
          <label className={styles.title}>Thông tin phiếu</label>
          <div className={styles.right_row}>
            <label>Số phiếu</label>
            <input
              type="text"
              value={infoForm["SOPHIEU"]}
              className={styles.small}
            />
          </div>
          <div className={styles.right_row}>
            <label>Ngày phiếu</label>
            <input
              type="date"
              value={convertDate(infoForm["NGAYPHIEU"])}
              onChange={(e) => {
                setInfoForm({ ...infoForm, NGAYPHIEU: e.target.value });
                setIsSaveDataNghiepVuGiaoHang(false);
              }}
              className={styles.small}
            />
          </div>
          <div className={styles.right_row}>
            <label>Diễn giải</label>
            <input
              type="text"
              value={infoForm["DIENGIAI"]}
              onChange={(e) => {
                setInfoForm({ ...infoForm, DIENGIAI: e.target.value });
                setIsSaveDataNghiepVuGiaoHang(false);
              }}
              className={styles.large}
            />
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
        setIsSaveData={setIsSaveDataNghiepVuGiaoHang}
        maxHeight={"22rem"}
        change={false}
      />
      <header className={styles.header_table}>Chi tiết đơn hàng</header>
      <SubTable
        columns={infoColumnsSub}
        data={dataTableSub}
        setDataTable={setDataTableSub}
        rowSelection={rowSelectionSub}
        flag_rowSelection={true}
        setRowSelection={setRowSelectionSub}
        setIsSaveData={setIsSaveDataNghiepVuGiaoHang}
        maxHeight={"22rem"}
        change={true}
      />
      <div className={styles.group_button}>
        <div>
          <button onClick={handleSave}>Lưu</button>
          <button onClick={handleNhapTiep}>Nhập tiếp</button>
          {/* <button>Đóng</button> */}
        </div>
      </div>
    </div>
  );
};

export default FormGiaoHang;
