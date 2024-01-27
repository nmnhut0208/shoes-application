import { useState, useEffect, useMemo } from "react";
import { ItemKhachHang } from "~items";
import moment from "moment";
import MainTable from "./MainTable";
import SubTable from "./SubTable";
import styles from "./FormGiaoHang.module.scss";
import { useUserContext } from "~user";
import { rem_to_px } from "~config/ui";
import {
  processingInfoColumnTable,
  processingInfoColumnTableHaveFooter,
} from "~utils/processing_data_table";
import { convertDateForReport } from "~utils/processing_date";
import { Modal } from "~common_tag";
import In from "./In";
import { useTableContext, actions_table } from "~table_context";
import { CustomAlert } from "~utils/alert_custom";
import { Popconfirm } from "antd";

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
    width: 10 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Số lượng còn lại",
    key: "SOLUONGCONLAI",
    width: 15 * rem_to_px,
    enableEditing: false,
    // muiTableBodyCellProps: {
    //   align: "right",
    // },
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
    width: 20 * rem_to_px,
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
    width: 5 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Size 6",
    key: "SIZE6",
    width: 5 * rem_to_px,
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
    width: 5 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Size 8",
    key: "SIZE8",
    width: 5 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Size 9",
    key: "SIZE9",
    width: 5 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Size 0",
    key: "SIZE0",
    width: 5 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Size 1",
    key: "SIZE1",
    width: 5 * rem_to_px,
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
    enableEditing: true,
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
    width: 50 * rem_to_px,
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

const FormGiaoHang = ({
  isSaveData,
  setIsSaveDataNghiepVuGiaoHang,
  permission,
}) => {
  console.log("=====infoColumns: ", infoColumns);

  const [userState, userDispatch] = useUserContext();
  const [dataTable, setDataTable] = useState([]);
  const [dataTableSub, setDataTableSub] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [rowSelectionSub, setRowSelectionSub] = useState({});
  const [curSelected, setCurSelected] = useState(null);
  const [mapSelected, setMapSelected] = useState({});
  const [mapRowSelectedSub, setMapRowSelectedSub] = useState({});
  // const test_makh = "THU";
  const [dataTableKhachHang, setDataTableKhachHang] = useState([]);
  const [rowSelectionMaKH, setRowSelectionMaKH] = useState({});
  const [infoKH, setInfoKH] = useState({});
  const [dataIn, setDataIn] = useState({});
  const [flag, setFlag] = useState(false);
  const [stateUser, dispatchUser] = useUserContext();
  const [stateTable, dispatchTable] = useTableContext();
  // const maForm = "F0034";
  const [infoForm, setInfoForm] = useState(() => {
    return {
      SOPHIEU: "",
      LastestGH: "",
      DIENGIAI: "",
      NGAYPHIEU: moment()
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .format("YYYY-MM-DD HH:mm:ss"),
    };
  });
  const [keys, setKeys] = useState(0);

  const handleSave = () => {
    if (
      // userState.userPoolAccess.some(
      //   (obj) => obj.MAFORM === maForm && obj.THEM === 1
      // )
      permission.THEM === 1
    ) {
      // const keys = Object.keys(rowSelectionSub);
      const data = [];
      // for (var i = 0; i < keys.length; i++) {
      //   if (rowSelectionSub[keys[i]] === true) {
      //     data.push(dataTableSub[keys[i]]);
      //   }
      // }
      // filter data from dataTableSub with mapRowSelectedSub
      // const keys = Object.keys(mapRowSelectedSub);
      // for (var i = 0; i < keys.length; i++) {
      //   const keys_sub = Object.keys(mapRowSelectedSub[keys[i]]);
      //   for (var j = 0; j < keys_sub.length; j++) {
      //     if (mapRowSelectedSub[keys[i]][keys_sub[j]] === true) {
      //       data.push(dataTableSub[keys[i]][keys_sub[j]]);
      //     }
      //   }
      // }
      const keys = Object.keys(rowSelection);
      for (var i = 0; i < keys.length; i++) {
        if (rowSelection[keys[i]] === true) {
          // get data from dataTableSub with mapSelected
          const sodh = mapSelected[keys[i]];
          const data_sub = dataTableSub[sodh];
          const keys_sub = Object.keys(data_sub);
          for (var j = 0; j < keys_sub.length; j++) {
            data.push(data_sub[keys_sub[j]]);
          }
        }
      }
      // console.log("size1: ", data);
      const send_data = {
        data: data,
        makh: infoKH.MAKH,
        sophieu: infoForm.SOPHIEU,
        diengiai: infoForm.DIENGIAI,
        user: userState.userName,
        date: moment(infoForm.NGAYPHIEU).format("YYYY-MM-DD HH:mm:ss"),
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
                  CustomAlert("Lưu thành công");
                } else {
                  CustomAlert("Lưu thất bại");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            CustomAlert("Lưu thất bại");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      CustomAlert("Bạn không có quyền thêm");
    }
  };

  const handleNhapTiep = () => {
    setDataTable([]);
    setDataTableSub([]);
    setRowSelection({});
    setRowSelectionSub({});
    setCurSelected(null);
    setKeys(0);
    setMapSelected({});
    setMapRowSelectedSub({});
    setRowSelectionMaKH({});
    setInfoKH({});
    setInfoForm({
      ...infoForm,
      SOPHIEU: infoForm.SOPHIEU,
      LastestGH: infoForm.LastestGH,
      DIENGIAI: "",
      NGAYPHIEU: moment().format("YYYY-MM-DD"),
    });
    setMaKH("");
    setTenKH("");
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
          NGAYPHIEU: moment().format("YYYY-MM-DD"),
        });
        setRowSelection({});
        setRowSelectionSub({});
        setDataTableSub([]);
      })
      .catch((error) => {
        console.log(error);
      });
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

  // useEffect(() => {
  //   console.log("info kh: ", infoKH["MAKH"]);
  //   if (infoKH["MAKH"] == undefined || infoKH["MAKH"] == "") {
  //     return;
  //   }
  //   const keys = Object.keys(rowSelection);
  //   // console.log("keys row: ", dataTable[keys[0]]);
  //   let data = [];
  //   for (var i = 0; i < keys.length; i++) {
  //     if (rowSelection[keys[i]] === true) {
  //       data.push(dataTable[keys[i]]["SODH"]);
  //       // console.log("data: ", dataTable[keys[i]]);
  //       // setDataTableSub([dataTable[keys[i]]]);
  //       // const send_data = {
  //       //   sodh: dataTable[keys[i]]["SODH"],
  //       //   makh: test_makh,
  //       // };
  //     }
  //   }
  //   const send_data = {
  //     sodh: data,
  //     makh: infoKH["MAKH"],
  //   };
  //   if (data.length === 0) {
  //     setDataTableSub([]);
  //     return;
  //   }
  //   fetch("http://localhost:8000/giaohang/" + infoKH["MAKH"], {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(send_data),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((info) => {
  //       console.log("info: ", info);
  //       setDataTableSub(info);
  //     })
  //     .catch((err) => {
  //       console.log(":error: ", err);
  //     });
  //   // console.log("sub: ", data);
  //   // setDataTableSub([...data]);
  // }, [rowSelection]);

  const infoColumnsSub = useMemo(() => {
    const infoColumnsSubInit = processingInfoColumnTableHaveFooter(
      list_key_sub,
      COLS_HAVE_SUM_FOOTER,
      dataTableSub[mapSelected[curSelected]]
        ? dataTableSub[mapSelected[curSelected]]
        : [],
      false
    );
    // update mapRowSelectedSub by rowSelectionSub example {mapSelected[curSelected]: rowSelectionSub}
    // setMapRowSelectedSub(
    //   {
    //     [mapSelected[curSelected]]: rowSelectionSub
    //   }
    // )
    // setRowSelectionSub({});
    // if mapSelected[curSelected] is key of mapRowSelectedSub
    // if (mapSelected[curSelected] in mapRowSelectedSub) {
    //   setRowSelectionSub(mapRowSelectedSub[mapSelected[curSelected]]);
    // }
    return infoColumnsSubInit;
  }, [curSelected, dataTableSub]);

  // console.log("infoColumnsSub: ", infoColumnsSub);
  console.log("selected: ", rowSelectionSub);

  useEffect(() => {
    if (infoKH["MAKH"] == undefined || infoKH["MAKH"] == "") {
      // setDataTable([]);
      return;
    }
    console.log("Call API");
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
        if (info.length > 0) {
          setCurSelected(0);
        }
        let data = [];
        for (var i = 0; i < info.length; i++) {
          data.push(info[i]["SODH"]);
        }
        if (data.length > 0) {
          const send_data = {
            sodh: data,
            makh: infoKH["MAKH"],
          };
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
              console.log("DataTableSub: ", info);
              setDataTableSub(info);
              // get keys of info to setMapSelected expample {0: key1, 1: key2, ...}
              const keys = Object.keys(info);
              const map = {};
              for (var i = 0; i < keys.length; i++) {
                map[i] = keys[i];
              }
              setMapSelected(map);
            });
        } else {
          setDataTableSub([]);
        }
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, [infoKH["MAKH"]]);

  const handleIn = () => {
    if (
      stateUser.userPoolAccess.some(
        (obj) => obj.MAFORM === "F0033" && obj.IN === 1
      )
    ) {
      // only get rowSelectionSub from dataTableSub
      // const keys = Object.keys(rowSelectionSub);
      const data = [];
      // for (var i = 0; i < keys.length; i++) {
      //   if (rowSelectionSub[keys[i]] === true) {
      //     data.push(dataTableSub[keys[i]]);
      //   }
      // }
      // filter data from dataTableSub with mapRowSelectedSub
      // const keys = Object.keys(mapRowSelectedSub);
      // for (var i = 0; i < keys.length; i++) {
      //   const keys_sub = Object.keys(mapRowSelectedSub[keys[i]]);
      //   for (var j = 0; j < keys_sub.length; j++) {
      //     if (mapRowSelectedSub[keys[i]][keys_sub[j]] === true) {
      //       data.push(dataTableSub[keys[i]][keys_sub[j]]);
      //     }
      //   }
      // }
      const keys = Object.keys(rowSelection);
      for (var i = 0; i < keys.length; i++) {
        if (rowSelection[keys[i]] === true) {
          // get data from dataTableSub with mapSelected
          const sodh = mapSelected[keys[i]];
          const data_sub = dataTableSub[sodh];
          const keys_sub = Object.keys(data_sub);
          for (var j = 0; j < keys_sub.length; j++) {
            data.push(data_sub[keys_sub[j]]);
          }
        }
      }
      const table = data.map((item) => {
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
      // const table = dataTableSub.map((item) => {
      //   const obj = {
      //     MAGIAY: item.MAGIAY,
      //     TENGIAY: item.TENGIAY,
      //     SOLUONG: item.SOLUONG,
      //     DONGIA: item.GIABAN,
      //     THANHTIEN: item.THANHTIEN,
      //     SODH: item.SODH,
      //   };
      //   return obj;
      // });
      // console.log("table: ", dataTableSub);
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
      CustomAlert("Bạn không có quyền in");
    }
  };

  const handleInCongNo = () => {
    if (
      stateUser.userPoolAccess.some(
        (obj) => obj.MAFORM === "F0033" && obj.IN === 1
      )
    ) {
      // const keys = Object.keys(rowSelectionSub);
      const data = [];
      // for (var i = 0; i < keys.length; i++) {
      //   if (rowSelectionSub[keys[i]] === true) {
      //     data.push(dataTableSub[keys[i]]);
      //   }
      // }
      // filter data from dataTableSub with mapRowSelectedSub
      // const keys = Object.keys(mapRowSelectedSub);
      // for (var i = 0; i < keys.length; i++) {
      //   const keys_sub = Object.keys(mapRowSelectedSub[keys[i]]);
      //   for (var j = 0; j < keys_sub.length; j++) {
      //     if (mapRowSelectedSub[keys[i]][keys_sub[j]] === true) {
      //       data.push(dataTableSub[keys[i]][keys_sub[j]]);
      //     }
      //   }
      // }
      const keys = Object.keys(rowSelection);
      for (var i = 0; i < keys.length; i++) {
        if (rowSelection[keys[i]] === true) {
          // get data from dataTableSub with mapSelected
          const sodh = mapSelected[keys[i]];
          const data_sub = dataTableSub[sodh];
          const keys_sub = Object.keys(data_sub);
          for (var j = 0; j < keys_sub.length; j++) {
            data.push(data_sub[keys_sub[j]]);
          }
        }
      }
      const table = data.map((item) => {
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
      // const table = dataTableSub.map((item) => {
      //   const obj = {
      //     MAGIAY: item.MAGIAY,
      //     TENGIAY: item.TENGIAY,
      //     SOLUONG: item.SOLUONG,
      //     DONGIA: item.GIABAN,
      //     THANHTIEN: item.THANHTIEN,
      //     SODH: item.SODH,
      //   };
      //   return obj;
      // });
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
      CustomAlert("Bạn không có quyền in");
    }
  };

  // useEffect(() => {
  //   if (mapSelected[curSelected] !== undefined) {
  //     setMapRowSelectedSub({
  //       ...mapRowSelectedSub,
  //       [mapSelected[curSelected]]: rowSelectionSub,
  //     });
  //   }
  // }, [rowSelectionSub]);

  // useEffect(() => {
  //   if (mapSelected[curSelected] in mapRowSelectedSub) {
  //     setRowSelectionSub(mapRowSelectedSub[mapSelected[curSelected]]);
  //   } else {
  //     setRowSelectionSub({});
  //   }
  // }, [curSelected]);

  const [maKH, setMaKH] = useState("");
  const [tenKH, setTenKH] = useState("");

  useEffect(() => {
    if (maKH != "") {
      var KhachHang = dataTableKhachHang.filter((x) => x["MAKH"] == maKH);
      const info = {
        MAKH: KhachHang[0]["MAKH"],
        TENKH: KhachHang[0]["TENKH"],
        DIACHI: KhachHang[0]["DIACHI"],
        SOPHIEU: infoForm.SOPHIEU,
        NGAYPHIEU: infoForm.NGAYPHIEU,
      };
      setInfoKH({ ...info });
    }
  }, [maKH]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.left}>
          <label className={styles.title}>Đơn hàng</label>
          <div className={styles.left_row}>
            <label>Khách hàng</label>
            <ItemKhachHang
              value={maKH}
              setValue={setMaKH}
              label={tenKH}
              setLabel={setTenKH}
              size_input={"15rem"}
              size_span={"35rem"}
              have_span={true}
              size_selection={550}
              have_set_save={true}
              isSaveData={isSaveData}
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
              value={infoForm["NGAYPHIEU"]}
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
                // setIsSaveDataNghiepVuGiaoHang(false);
              }}
              className={styles.large}
              autocomplete="off"
            />
          </div>
        </div>
      </div>
      <header className={styles.header_table}>Danh sách đơn hàng</header>
      <MainTable
        columns={infoColumns}
        data={dataTable}
        rowSelection={rowSelection}
        setCurSelected={setCurSelected}
        // flag_rowSelection={true}
        setRowSelection={setRowSelection}
        setIsSaveData={setIsSaveDataNghiepVuGiaoHang}
        maxHeight={"22rem"}
        change={false}
        setKeys={setKeys}
      />
      <header className={styles.header_table}>Chi tiết đơn hàng</header>
      <SubTable
        key={keys}
        columns={infoColumnsSub}
        data={
          dataTableSub[mapSelected[curSelected]]
            ? dataTableSub[mapSelected[curSelected]]
            : []
        }
        dataAll={dataTableSub}
        curDH={mapSelected[curSelected]}
        setDataTable={setDataTableSub}
        // rowSelection={
        //   mapRowSelectedSub[mapSelected[curSelected]]
        //     ? mapRowSelectedSub[mapSelected[curSelected]]
        //     : {}
        // }
        // flag_rowSelection={true}
        setRowSelection={setRowSelectionSub}
        setIsSaveData={setIsSaveDataNghiepVuGiaoHang}
        maxHeight={"25rem"}
        change={true}
        setKeys={setKeys}
      />
      <Modal>
        <In data={dataIn} flag={flag} />
      </Modal>
      <div className={styles.group_button}>
        <div>
          {/* <button onClick={handleIn}>In</button> */}
          {isSaveData ? <button onClick={handleIn}>In</button> : <></>}
          {/* <button onClick={handleInCongNo}>In Công Nợ</button> */}
          {isSaveData ? (
            <button onClick={handleInCongNo}>In Công Nợ</button>
          ) : (
            <></>
          )}
          <button onClick={handleSave}>Lưu</button>
          {/* <button onClick={handleNhapTiep}>Nhập tiếp</button> */}
          {isSaveData ? (
            <button onClick={handleNhapTiep}>Nhập tiếp</button>
          ) : (
            <Popconfirm
              title="Xác nhận hành động"
              description="Bạn muốn nhập tiếp mà không lưu thay đổi?"
              okText="Đồng ý"
              cancelText="Không đồng ý"
              onConfirm={handleNhapTiep}
              onCancel={() => {}}
            >
              <button>Nhập tiếp</button>
            </Popconfirm>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormGiaoHang;
