import { useState, useEffect, useMemo } from "react";
import SubTable from "./SubTable";
import styles from "./FormGiaoHang.module.scss";
import { useUserContext, actions } from "~user";
import { useTableContext, actions_table } from "~table_context";
import { Modal } from "~common_tag";
import In from "./In";
import {
  processingInfoColumnTable,
  processingInfoColumnTableHaveFooter,
} from "~utils/processing_data_table";
import { convertDateForReport } from "~utils/processing_date";
import { rem_to_px } from "~config/ui";

const list_key = [
  { header: "Số đơn hàng", key: "SODH", width: 5 * rem_to_px },
  {
    header: "Ngày đơn hàng",
    key: "NGAYDH",
    width: 5 * rem_to_px,
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  {
    header: "Ngày giao hàng",
    key: "NGAYGH",
    width: 5 * rem_to_px,
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  { header: "Diễn giải", key: "DIENGIAIDONG", width: 5 * rem_to_px },
  {
    header: "Số lượng",
    key: "SOLUONG",
    width: 5 * rem_to_px,
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
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
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
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  {
    header: "Size 8",
    key: "SIZE8",
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
    header: "Size 9",
    key: "SIZE9",
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
    header: "Size 0",
    key: "SIZE0",
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
    header: "Size 1",
    key: "SIZE1",
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
  {
    header: "Tên Giày",
    key: "TENGIAY",
    width: 35 * rem_to_px,
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

const FormGiaoHang = ({ infoKH, setShowForm }) => {
  const [stateUser, dispatchUser] = useUserContext();
  const [userState, userDispatch] = useUserContext();
  const [stateTable, dispatchTable] = useTableContext();
  const [dataTable, setDataTable] = useState([]);
  const [dataTableSub, setDataTableSub] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [dataIn, setDataIn] = useState({});
  const [flag, setFlag] = useState(false);
  // const test_makh = "THU";
  // const [dataTableKhachHang, setDataTableKhachHang] = useState([]);
  // const [rowSelectionMaKH, setRowSelectionMaKH] = useState({});
  // const [infoKH, setInfoKH] = useState({});

  console.log("GiaoHang");

  const handleSave = () => {
    const send_data = {
      data: dataTableSub,
      makh: infoKH.MAKH,
      sophieu: infoKH.SOPHIEU,
      diengiai: infoKH.DIENGIAIPHIEU,
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
        alert("Lưu thành công");
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  };

  const handleIn = () => {
    if (stateUser.userPoolAccess.some((obj) => obj.MAFORM === "F0033" && obj.IN === 1)) {
      const table = dataTableSub.map((item) => {
        const obj = {
          MAGIAY: item.MAGIAY,
          TENGIAY: item.TENGIAY,
          SOLUONG: item.SOLUONG,
          DONGIA: item.GIABAN,
          THANHTIEN: item.THANHTIEN,
          SODH: item.SODH,
        };
        return obj;
      });
      // console.log("table: ", dataTableSub);
      // group table follow MAGIAY
      const table_group = table.reduce((acc, curr) => {
        const index = acc.findIndex((item) => item.MAGIAY === curr.MAGIAY);
        if (index === -1) {
          acc.push(curr);
        } else {
          acc[index].SOLUONG += curr.SOLUONG;
          acc[index].THANHTIEN += curr.THANHTIEN;
        }
        return acc;
      }, []);
      // console.log("table group: ", table_group);
      setDataIn({
        MAKH: infoKH.MAKH,
        TENKH: infoKH.TENKH,
        DIACHI: infoKH.DIACHI,
        NGAYPHIEU: infoKH.NGAYPHIEU,
        SOPHIEU: infoKH.SOPHIEU,
        table: table_group,
      });
      setFlag(false);
      dispatchTable(actions_table.setModeShowModal(true));
    } else {
      alert("Bạn không có quyền in");
    }
  };

  const handleInCongNo = () => {
    if (stateUser.userPoolAccess.some((obj) => obj.MAFORM === "F0033" && obj.IN === 1)) {
      const table = dataTableSub.map((item) => {
        const obj = {
          MAGIAY: item.MAGIAY,
          TENGIAY: item.TENGIAY,
          SOLUONG: item.SOLUONG,
          DONGIA: item.GIABAN,
          THANHTIEN: item.THANHTIEN,
          SODH: item.SODH,
        };
        return obj;
      });
      const SOPHIEU = infoKH.SOPHIEU;
      const MAKH = infoKH.MAKH;
      const DATE = infoKH.NGAYPHIEU;
      fetch(
        `http://localhost:8000/congno/get_congno_khachhang?SOPHIEU=${SOPHIEU}&MAKH=${MAKH}&DATE_TO=${DATE}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log("tong no : ", data[0]["TONGNO"]);
          const table_group = table.reduce((acc, curr) => {
            const index = acc.findIndex((item) => item.MAGIAY === curr.MAGIAY);
            if (index === -1) {
              acc.push(curr);
            } else {
              acc[index].SOLUONG += curr.SOLUONG;
              acc[index].THANHTIEN += curr.THANHTIEN;
            }
            return acc;
          }, []);
          setDataIn({
            CONGNO: data[0]["TONGNO"],
            MAKH: infoKH.MAKH,
            TENKH: infoKH.TENKH,
            DIACHI: infoKH.DIACHI,
            NGAYPHIEU: infoKH.NGAYPHIEU,
            SOPHIEU: infoKH.SOPHIEU,
            table: table_group,
          });
          setFlag(true);
          dispatchTable(actions_table.setModeShowModal(true));
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    } else {
      alert("Bạn không có quyền in");
    }
    
  };

  // useEffect(() => {
  //   let keys = Object.keys(rowSelectionMaKH);
  //   if (keys.length > 0) {
  //     // setFormInfoDonHang({
  //     //   ...formInfoDonHang,
  //     //   MAKH: dataTableKhachHang[keys[0]]["MAKH"],
  //     //   TENKH: dataTableKhachHang[keys[0]]["TENKH"],
  //     // });
  //     const info = {
  //       MAKH: dataTableKhachHang[keys[0]]["MAKH"],
  //       TENKH: dataTableKhachHang[keys[0]]["TENKH"],
  //     };
  //     setInfoKH(info);
  //   }
  // }, [rowSelectionMaKH]);

  // useEffect(() => {
  //   fetch("http://localhost:8000/khachhang")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((info) => {
  //       console.log("info khach hang: ", info);
  //       setDataTableKhachHang(info);
  //     })
  //     .catch((err) => {
  //       console.log(":error: ", err);
  //     });
  // }, []);

  useEffect(() => {
    console.log("info kh: ", infoKH["MAKH"]);
    if (infoKH["MAKH"] == undefined) {
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
      SODH: data,
      MAKH: infoKH["MAKH"],
      SOPHIEU: infoKH["SOPHIEU"],
    };
    if (data.length === 0) {
      setDataTableSub([]);
      return;
    }
    fetch("http://localhost:8000/tv_giaohangsub", {
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

  useEffect(() => {
    if (infoKH["MAKH"] == undefined) {
      return;
    }
    fetch("http://localhost:8000/tv_giaohang", {
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
        console.log("info dh: ", info);
        setDataTable(info);
        const selected = {};
        for (var i = 0; i < info.length; i++) {
          selected[i] = true;
        }
        setRowSelection(selected);
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
            <input
              name="MAKH"
              value={infoKH["MAKH"]}
              // onChange={(e) => setFormInfoDonHang(e)}
            />
            <input
              type="text"
              className={styles.medium}
              value={infoKH["TENKH"]}
            />
          </div>
        </div>
        <div className={styles.right}>
          <label className={styles.title}>Thông tin phiếu</label>
          <div className={styles.right_row}>
            <label>Số phiếu</label>
            <input
              type="text"
              className={styles.small}
              value={infoKH["SOPHIEU"]}
            />
          </div>
          <div className={styles.right_row}>
            <label>Ngày phiếu</label>
            <input
              type="text"
              className={styles.small}
              value={infoKH["NGAYPHIEU"]}
            />
          </div>
          <div className={styles.right_row}>
            <label>Diễn giải</label>
            <input
              type="text"
              value={infoKH["DIENGIAIPHIEU"]}
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
        flag_rowSelection={false}
        // setRowSelection={setRowSelection}
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
      <Modal>
        <In data={dataIn} flag={flag} />
      </Modal>
      <div className={styles.group_button}>
        <div>
          {/* <button onClick={handleSave}>Lưu</button> */}
          {/* <button>Nhập tiếp</button> */}
          <button onClick={handleIn}>In</button>
          <button onClick={handleInCongNo}>In Công Nợ</button>
          {/* <button
            onClick={() => {
              // dispatchTable(actions_table.setModeShowModal(false));
              setShowForm(false);
            }}
          >
            Đóng
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FormGiaoHang;
