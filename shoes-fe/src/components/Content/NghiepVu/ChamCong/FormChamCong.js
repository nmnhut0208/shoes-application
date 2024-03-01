import { useState, useEffect } from "react";
import SubTable from "./SubTable";
import styles from "./FormChamCong.module.scss";
import { convertDate } from "~utils/processing_date";
import moment from "moment";
import { useUserContext } from "~user";
import { convertDateForReport } from "~utils/processing_date";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import { CustomAlert } from "~utils/alert_custom";
import { ItemNhanVien, ItemKyTinhLuong } from "~items";

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
  const [maKy, setMaKy] = useState("");
  const [tenKy, setTenKy] = useState("");
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

  console.log("ChamCong", infoForm["MAKY"]);

  const handleSave = () => {
    if (permission.THEM === 1) {
      if (dataTable.length === 0) {
        CustomAlert("Không có dữ liệu để lưu");
        return;
      }
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
                })
                .then((info) => {
                  setDataTableSub(info);
                  // console.log("abc: ", info);
                })
                .catch((err) => {
                  console.log(":error: ", err);
                });
            }
            // console.log("data: ", dataTable);
            CustomAlert("Lưu thành công");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      CustomAlert("Bạn không có quyền thêm");
    }
  };

  useEffect(() => {
    setInfoForm({ ...infoForm, MAKY: maKy, TENKY: tenKy });
    setDataTable([]);
    setDataTableSub([]);
    setRowSelection({ 0: true });
  }, [maKy]);

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

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.left}>
          <div
            className={styles.left_row}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <label>Mã kỳ</label>
            <ItemKyTinhLuong
              value={maKy}
              setValue={setMaKy}
              label={tenKy}
              setLabel={setTenKy}
              size_input={"20rem"}
              have_span={true}
              size_span={"30rem"}
              size_selection={"50.5rem"}
              readOnly={false}
            />
          </div>
          <div
            className={styles.left_row}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <label>Mã nhân viên</label>
            <ItemNhanVien
              initValue={{
                value: infoForm["MANVIEN"],
                label: infoForm["TENNVIEN"],
              }}
              changeData={(dict_data) => {
                setInfoForm({
                  ...infoForm,
                  MANVIEN: dict_data["value"],
                  TENNVIEN: dict_data["label"],
                });
                setDataTable([]);
                setDataTableSub([]);
                setRowSelection({ 0: true });
              }}
              size_input={"20rem"}
              size_span={"30rem"}
              size_selection={"50.5rem"}
            />
          </div>
        </div>
        <div className={styles.right}>
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
