import MaterialReactTable from "material-react-table";
import styles from "./XemPhanCong.module.scss";
import { useMemo, useState, useEffect } from "react";
import {
  renderDataEmpty,
  processingInfoColumnTable,
} from "~utils/processing_data_table";
import { INFO_COLS_THO, INFO_COLS_DONHANG } from "./ConstantVariable";

const Table = ({ columns, data, maxHeight }) => {
  return (
    <div>
      <MaterialReactTable
        enableTopToolbar={false}
        columns={columns}
        data={data}
        // components
        enableColumnActions={false}
        enableSorting={false}
        // enable phân trang
        enablePagination={false}
        enableBottomToolbar={true}
        // scroll to bottom
        enableRowVirtualization
        muiTableContainerProps={{
          sx: { maxHeight: [maxHeight, "rem"].join("") },
        }}
      />
    </div>
  );
};

const XemPhanCong = ({ SOPHIEU, dataPhanCong }) => {
  const column_tho = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_THO);
  }, []);

  const column_donhang = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_DONHANG);
  }, []);

  const [dataThoDe, setDataThoDe] = useState([]);
  const [dataThoQuai, setDataThoQuai] = useState([]);

  useEffect(() => {
    console.log("run effect");
    fetch(
      "http://localhost:8000/phancong/get_thongtin_thode?SOPC=" +
        encodeURIComponent(SOPHIEU)
    )
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log("info: ", info);
        setDataThoDe(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
    fetch(
      "http://localhost:8000/phancong/get_thongtin_thoquai?SOPC=" +
        encodeURIComponent(SOPHIEU)
    )
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log("info: ", info);
        setDataThoQuai(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  const compute_sum = (data, key) => {
    return data.reduce((a, b) => a + parseInt(b[key]), 0);
  };

  const data_donhang = useMemo(() => {
    console.log("dun find data donahang");
    console.log(SOPHIEU, dataPhanCong);
    let list_key_checked = [];
    let donhang = [];
    for (let i = 0; i < dataPhanCong.length; i++) {
      let key = dataPhanCong[i]["MAGIAY"] + dataPhanCong[i]["SODH"];
      console.log("key: ", key);
      if (!list_key_checked.includes(key)) {
        let query = dataPhanCong.filter(
          (data) =>
            data["MAGIAY"] === dataPhanCong[i]["MAGIAY"] &&
            data["SODH"] === dataPhanCong[i]["SODH"]
        );
        console.log("query: ", query);
        let _donhang = { ...query[0] };
        for (let _k in _donhang) {
          if (_k.includes("SIZE")) {
            _donhang[_k] = compute_sum(query, _k);
            console.log(_k, _donhang[_k]);
          }
        }
        donhang.push(_donhang);
        list_key_checked.push(key);
      }
    }
    return donhang;
  }, []);

  console.log("data_donhang: ", data_donhang);

  return (
    <div className={styles.container}>
      <div className={styles.tho_quai_container}>
        <fieldset>
          <legend>Thợ quai</legend>
          <Table columns={column_tho} data={dataThoQuai} maxHeight={15} />
        </fieldset>
      </div>
      <div className={styles.tho_de_container}>
        <fieldset>
          <legend>Thợ đế</legend>
          <Table columns={column_tho} data={dataThoDe} maxHeight={15} />
        </fieldset>
      </div>
      <div className={styles.don_hang_container}>
        <Table columns={column_donhang} data={data_donhang} maxHeight={25} />
      </div>
    </div>
  );
};

export default XemPhanCong;
