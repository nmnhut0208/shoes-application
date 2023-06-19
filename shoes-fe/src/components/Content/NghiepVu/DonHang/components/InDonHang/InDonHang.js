import { useMemo, useRef, useState, useLayoutEffect } from "react";
import { useReactToPrint } from "react-to-print";
import MaterialReactTable from "material-react-table";

import styles from "./InDonHang.module.scss";
import { INFO_COLS_THO } from "./ConstantVariable";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import { PhanSo } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";

const Table = ({ columns, data }) => {
  return (
    <MaterialReactTable
      muiTablePaperProps={{
        //customize paper styles
        sx: {
          borderRadius: "0",
          borderLeft: "0.2rem solid rgba(0, 0, 0, 0.9)",
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          borderRight: "0.2rem solid rgba(0, 0, 0, 0.9)",
          borderBottom: "0.2rem solid rgba(0, 0, 0, 0.9)",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          borderRight: "0.2rem solid rgba(0, 0, 0, 0.9)",
          borderBottom: "0.2rem solid rgba(0, 0, 0, 0.9)",
        },
      }}
      muiTableFooterCellProps={{
        sx: {
          borderRight: "0.2rem solid rgba(0, 0, 0, 0.9)",
          borderBottom: "0.2rem solid rgba(0, 0, 0, 0.9)",
        },
      }}
      muiTableContainerProps={{
        sx: {
          border: "none",
          borderTop: "0.2rem solid rgba(0, 0, 0, 0.9)",
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

const InDonHang = ({ infoHeader, dataTable }) => {
  const [dataPrint, setDataPrint] = useState([]);
  const [stateTable, dispatchTable] = useTableContext();
  const columns = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_THO);
  }, []);
  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Thông tin đơn hàng",
  });
  useLayoutEffect(() => {
    let ma_giay_checked = [];
    let info_print = [];
    for (let i = 0; i < dataTable.length; i++) {
      let ma_giay = dataTable[i]["MAGIAY"];
      if (!ma_giay_checked.includes(ma_giay)) {
        const info = {
          MAGIAY: ma_giay,
          TENGIAY: dataTable[i]["TENGIAY"],
          HINHANH: dataTable[i]["HINHANH"], // CALL API lấy hình ảnh lên
          // viết call API chờ chạy xong mới làm tiếp
        };
        info["THO"] = dataTable.filter((_data) => _data["MAGIAY"] === ma_giay);
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

  useLayoutEffect(() => {
    if (dataPrint.length > 0) {
      handelPrint();
      dispatchTable(actions_table.setModeShowModal(false));
    }
  }, [dataPrint]);

  return (
    <div ref={componentRef} className={styles.print_page}>
      <div className={styles.print_header}>
        <div className={styles.info}>
          <h1>Số đơn hàng: {infoHeader["SODH"]}</h1>
          <h1>Ngày: {infoHeader["NGAYDH"]}</h1>
        </div>
        <div className={styles.header_right}>
          <h1>{infoHeader["TENKH"]}</h1>
        </div>
      </div>
      <br />
      <br />

      {dataPrint.length > 0 &&
        dataPrint.map((info, index) => (
          <div className={styles.print_object} key={index}>
            <div className={styles.info_giay}>
              <table style={{ width: "100%" }}>
                <tr className={styles.info_row_giay}>
                  <td>{info["TENGIAY"]}</td>
                  <td>{info["HINHANH"] && <img src={info["HINHANH"]} />}</td>
                  <td>{info["MAGIAY"]}</td>
                </tr>
              </table>
            </div>
            <Table data={info["THO"]} columns={columns} />
          </div>
        ))}
    </div>
  );
};

export default InDonHang;
