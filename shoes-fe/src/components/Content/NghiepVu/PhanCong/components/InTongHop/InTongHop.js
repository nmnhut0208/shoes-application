import { useMemo, useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import MaterialReactTable from "material-react-table";

import styles from "./InTongHop.module.scss";
import { INFO_COLS_THO } from "./ConstantVariable";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import PhanSo from "./PhanSo";

const Table = ({ columns, data }) => {
  return (
    <MaterialReactTable
      muiTablePaperProps={{
        //customize paper styles
        sx: {
          borderRadius: "0",
          borderLeft: "0.2rem solid rgba(0, 0, 0, 0.3)",
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          borderRight: "0.2rem solid rgba(0, 0, 0, 0.3)",
          borderBottom: "0.2rem solid rgba(0, 0, 0, 0.3)",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          borderRight: "0.2rem solid rgba(0, 0, 0, 0.3)",
          borderBottom: "0.2rem solid rgba(0, 0, 0, 0.3)",
        },
      }}
      enableTopToolbar={false}
      columns={columns}
      data={data}
      // components
      enableColumnActions={false}
      enableSorting={false}
      // enable phân trang
      enablePagination={false}
      enableBottomToolbar={false}
    />
  );
};

const COL_INFO_SIZE = [
  { key: 0, name: "SIZE0" },
  { key: 5, name: "SIZE5" },
  { key: 6, name: "SIZE6" },
  { key: 7, name: "SIZE7" },
  { key: 8, name: "SIZE8" },
  { key: 9, name: "SIZE9" },
];
const SIZE_INFOR_PRINT = ({ list_tuso, list_mauso }) => {
  return (
    <div className={styles.group_phanso}>
      {list_tuso.map((tuso, index) => (
        <PhanSo tuso={tuso} mauso={list_mauso[index]} />
      ))}
    </div>
  );
};

const InTongHop = ({ sophieu, data }) => {
  const [dataPrint, setDataPrint] = useState([]);
  const columns = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_THO);
  }, []);
  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Thông tin phân công",
  });
  useEffect(() => {
    let ma_giay_checked = [];
    let info_print = [];
    for (let i = 0; i < data.length; i++) {
      let ma_giay = data[i]["MAGIAY"];
      if (!ma_giay_checked.includes(ma_giay)) {
        const info = {
          MAGIAY: ma_giay,
          TENGIAY: data[i]["TENGIAY"],
          HINHANH: data[i]["HINHANH"],
        };
        info["THO"] = data.filter((_data) => _data["MAGIAY"] === ma_giay);
        console.log("info[tho]: ", info["THO"]);
        for (let j = 0; j < info["THO"].length; j++) {
          info["THO"][j]["SIZE"] = "";
          let top = [];
          let line = [];
          let bottom = [];
          let tongso = 0;
          for (let k = 0; k < COL_INFO_SIZE.length; k++) {
            if (info["THO"][j][COL_INFO_SIZE[k].name] > 0) {
              let value = parseInt(info["THO"][j][COL_INFO_SIZE[k].name]);
              top.push(COL_INFO_SIZE[k].key);
              line.push("__");
              bottom.push(value);
              tongso += value;
            }
          }

          info["THO"][j]["TONGSO"] = tongso;

          info["THO"][j]["SIZE_header"] = top;
          info["THO"][j]["SIZE_detail"] = bottom;
          info["THO"][j]["SIZE"] = (
            <SIZE_INFOR_PRINT list_tuso={top} list_mauso={bottom} />
          );
        }
        ma_giay_checked.push(ma_giay);
        info_print.push(info);
      }
    }
    console.log("info_print: ", info_print);
    setDataPrint(info_print);
  }, []);
  useEffect(() => {
    if (dataPrint.length > 0) handelPrint();
  }, [dataPrint]);
  return (
    <div ref={componentRef} className={styles.print_page}>
      <h1 className={styles.print_header}>Số phiếu: {sophieu}</h1>
      {dataPrint.length > 0 &&
        dataPrint.map((info, index) => (
          <div className={styles.print_object} key={index}>
            <div className={styles.info_giay}>
              <table style={{ width: "100%" }}>
                <tr className={styles.info_row_giay}>
                  <th>{info["TENGIAY"]}</th>
                  <th>{info["HINHANH"] && <img src={info["HINHANH"]} />}</th>
                  <th>{info["MAGIAY"]}</th>
                </tr>
              </table>
            </div>
            <Table data={info["THO"]} columns={columns} />
          </div>
        ))}
    </div>
  );
};

export default InTongHop;
