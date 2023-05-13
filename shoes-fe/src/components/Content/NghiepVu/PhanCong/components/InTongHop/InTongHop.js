import { useMemo, useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import MaterialReactTable from "material-react-table";

import styles from "./InTongHop.module.scss";
import { INFO_COLS_THO, processingInfoColumnTable } from "./ConstantVariable";

// Xài cái này có thể in hết các page mà ko mất
// thông tin ko => do nó hay bị margin khi in
//

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
      enableBottomToolbar={true}
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
    onAfterPrint: () => alert("In thành công"),
  });
  useEffect(() => {
    console.log("pre-processing");
    let ma_giay_checked = [];
    let info_print = [];
    for (let i = 0; i < data.length; i++) {
      let ma_giay = data[i]["Mã giày"];
      if (ma_giay_checked.includes(ma_giay)) {
        i++;
      } else {
        const info = { "Mã giày": ma_giay, "Tên giày": data[i]["Tên giày"] };
        // let subdata = [...data]; //data.slice(i, data.length);
        info["Thợ"] = data.filter((_data) => _data["Mã giày"] === ma_giay);
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
    <div
      ref={componentRef}
      style={{ width: "100%", height: window.innerHeight }}
    >
      <header className={styles.print_header}>
        Số phiếu: {data["Số phiếu"]}
      </header>
      {dataPrint.length > 0 &&
        dataPrint.map((info, index) => (
          <div className={styles.print_object}>
            <div className={styles.info_giay}>
              <span>{info["Tên giày"]}</span>
              <span>{info["Mã giày"]}</span>
            </div>
            <Table data={info["Thợ"]} columns={columns} />
          </div>
        ))}

      {/* <button onClick={handelPrint}>IN</button> */}
    </div>
  );
};

export default InTongHop;
