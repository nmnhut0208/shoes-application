import moment from "moment";
// import OptionMau from "./OptionMau";
import GiayUnique from "./GiayUnique";
import InputMau from "./InputMau/InputMau";
import {
  INFO_COLS_DONHANG,
  COLS_HAVE_SUM_FOOTER,
  COLS_HAVE_SELECT_INPUT,
} from "./ConstantVariable";
import { handleDisableKeyDownUp, handleFocus } from "~utils/event";
import { renderDataEmpty } from "~utils/processing_data_table";

const handleSaveCell = (cell, value, data, setDataTable, setIsSaveData) => {
  //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
  var row_current = data[cell.row.index];
  // Tính lại tại thay đổi tại dòng hiện tại đang chỉnh sửa
  // Tính lại số lượng
  var list_size = [
    "SIZE5",
    "SIZE6",
    "SIZE7",
    "SIZE8",
    "SIZE9",
    "SIZE0",
    "SIZE1",
  ];
  if (list_size.includes(cell.column.id) || cell.column.id === "GIABAN") {
    if (value === "") value = 0;
    row_current[cell.column.id] = parseInt(value);

    if (row_current["GIABAN"] === "") row_current["GIABAN"] = 1;
    var so_luong = 0;
    for (let i = 0; i < list_size.length; i++) {
      so_luong += row_current[list_size[i]];
    }
    row_current["SOLUONG"] = so_luong;
    console.log("row_current: ", row_current);
    row_current["THANHTIEN"] =
      row_current["SOLUONG"] * parseInt(row_current["GIABAN"]);
    data[cell.row.index] = row_current;
  } else {
    data[cell.row.index][cell.column.id] = value;
  }
  // tìm số dòng có tổng số lượng == 0
  // nếu chưa có dòng nào thì add thêm 1 dòng
  let line_soluong_zero = data.filter((row) => row.SOLUONG === 0);
  if (line_soluong_zero.length === 0) {
    data.push(renderDataEmpty(INFO_COLS_DONHANG, 1)[0]);
  }
  setDataTable([...data]);
  setIsSaveData(false);
};

export const updateColumnsInformations = (
  dataTable,
  setDataTable,
  view,
  listGiayUnique,
  setIsSaveData
) => {
  const infoColumnsInit = [];

  for (let index in INFO_COLS_DONHANG) {
    let key = INFO_COLS_DONHANG[index]["key"];
    var info = {
      header: INFO_COLS_DONHANG[index]["header"],
      size: INFO_COLS_DONHANG[index]["width"],
      accessorKey: INFO_COLS_DONHANG[index]["key"],
      enableEditing: INFO_COLS_DONHANG[index]["enableEditing"],
      key: INFO_COLS_DONHANG[index]["key"].toLowerCase(),
    };

    if (key === "MAGIAY") {
      info["Cell"] = ({ cell }) => (
        <GiayUnique
          listGiayUnique={listGiayUnique}
          init={dataTable[cell.row.id][cell.column.id]}
          handleChangeDataTable={(value, label) => {
            dataTable[cell.row.id][cell.column.id] = value;
            dataTable[cell.row.id]["TENGIAY"] = label;
            setDataTable([...dataTable]);
          }}
          readOnly={view}
        />
      );
    }

    // Render input tag for edit cell
    if (key.includes("SIZE") || key === "GIABAN") {
      info["Cell"] = ({ cell }) => (
        <input
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            fontSize: "1.4rem",
            backgroundColor: "inherit",
            textAlign: "right",
            marginRight: "0.5rem",
          }}
          readOnly={view || dataTable[cell.row.id]["MAGIAY"] === ""}
          type="number"
          value={cell.getValue().toString()}
          onChange={(e) =>
            handleSaveCell(
              cell,
              e.target.value,
              dataTable,
              setDataTable,
              setIsSaveData
            )
          }
          onKeyDown={handleDisableKeyDownUp}
          onKeyUp={handleDisableKeyDownUp}
          onFocus={handleFocus}
        />
      );
    }

    if (key === "SOLUONG" || key === "THANHTIEN")
      info["Cell"] = ({ cell }) => (
        <input
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            fontSize: "1.4rem",
            backgroundColor: "inherit",
            textAlign: "right",
            marginRight: "0.5rem",
          }}
          tabindex="-1"
          value={parseFloat(cell.getValue()).toLocaleString("en")}
        />
      );

    if (key === "DIENGIAIDONG" || key === "INHIEU") {
      info["Cell"] = ({ cell }) => (
        <input
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            fontSize: "1.4rem",
            backgroundColor: "inherit",
          }}
          readOnly={view}
          type="text"
          tabindex="-1"
          value={cell.getValue()}
          onChange={(e) => {
            dataTable[cell.row.id][cell.column.id] = e.target.value;
            setDataTable([...dataTable]);
          }}
        />
      );
    }
    if (COLS_HAVE_SELECT_INPUT.includes(key)) {
      info["Cell"] = ({ cell }) => {
        return (
          <div style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
            <InputMau
              init={dataTable[cell.row.id][cell.column.id]}
              handleChangeDataTable={(value, label) => {
                dataTable[cell.row.id][cell.column.id] = value;
                dataTable[cell.row.id]["TEN" + cell.column.id] = label;
                setDataTable([...dataTable]);
              }}
              readOnly={view || dataTable[cell.row.id]["MAGIAY"] === ""}
            />
          </div>
        );
      };
    }

    if (key === "MAGIAY") info["Footer"] = () => <div>Tổng cộng</div>;
    if (COLS_HAVE_SUM_FOOTER.includes(key)) {
      let sum_value = dataTable.reduce((total, row) => total + row[key], 0);
      info["Footer"] = () => (
        <input
          style={{
            textAlign: "right",
            height: "100%",
            width: "100%",
            border: "none",
            fontWeight: "bold",
            fontSize: "1.4rem",
            marginRight: "0.5rem",
          }}
          value={parseFloat(sum_value).toLocaleString("en")}
        />
      );
    }
    infoColumnsInit.push(info);
  }
  return infoColumnsInit;
};

export const updateSODH = (sodh) => {
  console.log("save so don hang");
  fetch("http://localhost:8000/hethong/donhang/SODH", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ LASTNUMBER: sodh }),
  }).catch((error) => {
    console.log("error: ", error);
  });
};

export const updateDanhSachMau = (setDataMau) => {
  fetch("http://localhost:8000/mau")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      let listMau = info.map(function (ob) {
        return { label: ob.TENMAU, value: ob.MAMAU };
      });
      let listMauDefault = [
        { lable: "", value: null },
        { label: "", value: "" },
      ];
      setDataMau([...listMauDefault, ...listMau]);
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const saveDonDatHang = (formInfoDonHang, dataDatHang) => {
  for (let i = 0; i < dataDatHang.length; i++) {
    dataDatHang[i] = { ...dataDatHang[i], ...formInfoDonHang };
  }
  console.log("save don hang", JSON.stringify(dataDatHang));
  fetch("http://localhost:8000/donhang", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataDatHang),
  })
    .then((response) => {
      console.log("response: ", response);
      alert("Lưu thông tin thành công.");
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const updateFormDonHang = (
  formInfoDonHang,
  setFormInfoDonHang,
  setLastestDH
) => {
  fetch("http://localhost:8000/hethong/donhang/SODH")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let sodh = data["SODH"];
      setFormInfoDonHang({
        ...formInfoDonHang,
        DIENGIAIPHIEU: "",
        SODH: sodh,
        NGAYDH: moment().format("YYYY-MM-DD HH:mm:ss"),
        NGAYGH: moment().add(5, "d").format("YYYY-MM-DD HH:mm:ss"),
      });
      setLastestDH(data["LastestDH"]);
    })
    .catch((err) => {
      console.log(err);
    });
};
