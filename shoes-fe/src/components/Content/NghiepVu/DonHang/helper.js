import moment from "moment";
import { OptionMau } from "./components";
import {
  INFO_COLS_DONHANG,
  COLS_HAVE_SUM_FOOTER,
  COLS_HAVE_SELECT_INPUT,
} from "./ConstantVariable";

export const updateColumnsInformations = (dataMau, dataTable, setDataTable) => {
  const infoColumnsInit = [];

  for (var obj in INFO_COLS_DONHANG) {
    let key = INFO_COLS_DONHANG[obj]["key"];
    var info = {
      header: INFO_COLS_DONHANG[obj]["header"],
      size: INFO_COLS_DONHANG[obj]["width"],
      accessorKey: INFO_COLS_DONHANG[obj]["key"],
      enableEditing: INFO_COLS_DONHANG[obj]["enableEditing"],
      key: INFO_COLS_DONHANG[obj]["key"].toLowerCase(),
    };

    if (COLS_HAVE_SELECT_INPUT.includes(key)) {
      info["Cell"] = ({ cell }) => {
        return (
          <>
            <OptionMau
              init={dataTable[cell.row.id][cell.column.id]}
              id_row={cell.row.id}
              id_column={cell.column.id}
              dataTable={dataTable}
              dataMau={dataMau}
              handleChange={(value) => {
                dataTable[cell.row.id][cell.column.id] = value;
                setDataTable([...dataTable]);
              }}
            />
          </>
        );
      };
    }

    if (key === "TENGIAY") info["Footer"] = () => <div>Tổng cộng</div>;
    if (COLS_HAVE_SUM_FOOTER.includes(key)) {
      let sum_value = dataTable.reduce((total, row) => total + row[key], 0);
      info["Footer"] = () => <div>{sum_value}</div>;
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
      console.log(":data: ", data);
      console.log("today: ", moment().format("YYYY-MM-DD HH:mm:ss"));
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
