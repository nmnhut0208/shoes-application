import { useMemo, useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import MaterialReactTable from "material-react-table";

import styles from "./InTongHop.module.scss";
import { INFO_COLS_THO } from "./ConstantVariable";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const Table = ({ columns, data }) => {
  return (
    <MaterialReactTable
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

const InTongHop = ({ data }) => {
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
      if (ma_giay_checked.includes(ma_giay)) {
        i++;
      } else {
        const info = { MAGIAY: ma_giay, TENGIAY: data[i]["TENGIAY"] };
        info["THO"] = data.filter((_data) => _data["MAGIAY"] === ma_giay);
        ma_giay_checked.push(ma_giay);
        info_print.push(info);
      }
    }
    setDataPrint(info_print);
  }, []);
  useEffect(() => {
    if (dataPrint.length > 0) handelPrint();
  }, [dataPrint]);
  return (
    <div
      ref={componentRef}
      // style={{ width: "100%", height: window.innerHeight }}
      className={styles.print_page}
    >
      <h1 className={styles.print_header}>Số phiếu: {data["SOPHIEU"]}</h1>
      {dataPrint.length > 0 &&
        dataPrint.map((info, index) => (
          <div className={styles.print_object}>
            <div className={styles.info_giay}>
              <table style={{ width: "100%" }}>
                <tr className={styles.info_row_giay}>
                  <th>{info["TENGIAY"]}</th>
                  <th>
                    <img src="https://img.muji.net/img/item/4550344414620_1260.jpg" />
                  </th>
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
