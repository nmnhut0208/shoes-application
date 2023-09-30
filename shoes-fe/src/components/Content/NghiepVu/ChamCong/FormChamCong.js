import { useState, useEffect } from "react";
import SubTable from "./SubTable";
import styles from "./FormChamCong.module.scss";
import { Popover } from "antd";
import { convertDate } from "~utils/processing_date";
import moment from "moment";
import { useUserContext } from "~user";
import TableMaNVIEN from "./TableMaNVIEN";
import TableMaKY from "./TableMaKY";
import { convertDateForReport } from "~utils/processing_date";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Số phiếu", key: "SOPHIEU" },
  {
    header: "Ngày phiếu",
    key: "NGAYPHIEU",
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  { header: "Diễn giải", key: "DIENGIAI" },
];

const infoColumns = processingInfoColumnTable(list_key);

const list_key_sub = [
  { header: "Mã giày", key: "MAGIAY" },
  { header: "Tên giày", key: "tengiay" },
  {
    header: "Số lượng phân công",
    key: "SLPHANCONG",
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  {
    header: "Số lượng hoàn thành",
    key: "SLCHAMCONG",
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
];

const infoColumnsSub = processingInfoColumnTable(list_key_sub);

const FormChamCong = ({ setIsSaveDataNghiepVuChamCong, permission }) => {
  const [userState, userDispatch] = useUserContext();
  const [dataTable, setDataTable] = useState([]);
  const [dataTableSub, setDataTableSub] = useState([]);
  const [rowSelection, setRowSelection] = useState({ 0: true });
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
      // userState.userPoolAccess.some(
      //   (obj) => obj.MAFORM === maForm && obj.THEM === 1
      // )
      permission.THEM === 1
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
            setIsSaveDataNghiepVuChamCong(true);
            // remove dataTable with index in rowSelection
            let keys = Object.keys(rowSelection);
            const new_dataTable = dataTable.filter(
              (item, index) => !keys.includes(index.toString())
            );
            setDataTable(new_dataTable);
            // console.log("keys: ", keys, dataTable.length);
            if (parseInt(keys[0]) === dataTable.length - 1) {
              // const new_key = parseInt(keys[0]) - 1;
              keys = [String(parseInt(keys[0]) - 1)];
              // console.log("new_key: ", new_key);
              setRowSelection({ [keys[0]]: true });
            }
            if (new_dataTable.length === 0) {
              setDataTableSub([]);
            } else {
              // console.log("keys: ", keys, dataTableSub);
              const data = [];
              for (var i = 0; i < keys.length; i++) {
                  data.push(new_dataTable[keys[i]]["SOPHIEU"]);
                  setInfoForm({
                    ...infoForm,
                    SOPHIEU: new_dataTable[keys[i]]["SOPHIEU"],
                  });
              }
              const send_data = {
                MANVIEN: infoForm["MANVIEN"],
                MAKY: infoForm["MAKY"],
                PHIEUPC: data,
              };
              // console.log("send_data: ", send_data);
              fetch("http://localhost:8000/chamcong/" + infoForm["MANVIEN"], {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(send_data),
              })
                .then((response) => {
                  return response.json();
                }
                )
                .then((info) => {
                  setDataTableSub(info);
                  // console.log("abc: ", info);
                }
                )
                .catch((err) => {
                  console.log(":error: ", err);
                }
                );
            }
            // console.log("data: ", dataTable);
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
      setRowSelection({ 0: true });
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
      setRowSelection({ 0: true });
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
    if (keys.length === 0 || dataTable.length === 0) {
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
        // fill data for dataTableSub with first row of dataTable
        if (info.length > 0) {
          const keys = Object.keys(rowSelection);
          if (keys.length > 0) {
            const data = [];
            for (var i = 0; i < keys.length; i++) {
              if (rowSelection[keys[i]] === true) {
                data.push(info[keys[i]]["SOPHIEU"]);
                setInfoForm({
                  ...infoForm,
                  SOPHIEU: info[keys[i]]["SOPHIEU"],
                });
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
                // console.log("abc: ", info);
              })
              .catch((err) => {
                console.log(":error: ", err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, [infoForm["MANVIEN"], infoForm["MAKY"]]);

  console.log("selected: ", rowSelection, dataTableSub)

  // start: add to change Popover's behavior 
  const [clickedPopoverMaKy, setClickedPopoverMaKy] = useState(false);
  const [clickedPopoverMaNV, setClickedPopoverMaNV] = useState(false);
  // end: add to change Popover's behavior 

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.left}>
          {/* <label className={styles.title}>Đơn hàng</label> */}
          <div className={styles.left_row}>
            <label>Mã kỳ</label>

            <Popover
              placement="bottomLeft"
              trigger="click"
              open={clickedPopoverMaKy}
              onOpenChange={(open) => setClickedPopoverMaKy(open)}
              content={
                <TableMaKY
                  setRowSelection={setRowSelectionMaKY}
                  rowSelection={rowSelectionMaKY}
                  data={dataTableKY}
                  setIsSaveData={setIsSaveDataNghiepVuChamCong}
                  setClickedPopover={setClickedPopoverMaKy}
                />
              }
            >
              <input
                value={infoForm["MAKY"]}
                readOnly={true}
                className={styles.small}
              />
            </Popover>
            <input
              value={infoForm["TENKY"]}
              readOnly={true}
              className={styles.medium}
            />
          </div>
          <div className={styles.left_row}>
            <label>Mã nhân viên</label>
            <Popover
              placement="bottomLeft"
              trigger="click"
              open={clickedPopoverMaNV}
              onOpenChange={(open) => setClickedPopoverMaNV(open)}
              content={
                <TableMaNVIEN
                  setRowSelection={setRowSelectionMaNVIEN}
                  rowSelection={rowSelectionMaNVIEN}
                  data={dataTableNhanVien}
                  setIsSaveData={setIsSaveDataNghiepVuChamCong}
                  setClickedPopover={setClickedPopoverMaNV}
                />
              }
            >
              <input
                value={infoForm["MANVIEN"]}
                readOnly={true}
                className={styles.small}
              />
            </Popover>
            <input
              value={infoForm["TENNVIEN"]}
              readOnly={true}
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
                setIsSaveDataNghiepVuChamCong(false);
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
                setIsSaveDataNghiepVuChamCong(false);
              }}
              className={styles.large}
              autocomplete="off"
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
        setIsSaveData={setIsSaveDataNghiepVuChamCong}
        maxHeight={"24rem"}
      />
      <header className={styles.header_table}>Chi tiết phiếu phân công</header>
      <SubTable
        columns={infoColumnsSub}
        data={dataTableSub}
        rowSelection={{}}
        flag_rowSelection={false}
        // setRowSelection={setRowSelection}
        setIsSaveData={setIsSaveDataNghiepVuChamCong}
        maxHeight={"26rem"}
      />
      <div className={styles.group_button}>
        <div>
          <button onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default FormChamCong;
