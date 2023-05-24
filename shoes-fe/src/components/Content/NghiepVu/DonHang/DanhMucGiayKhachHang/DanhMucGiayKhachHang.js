import { useEffect, useState, useMemo } from "react";
import MaterialReactTable from "material-react-table";

import { useTableContext, actions_table } from "~table_context";
import { COL_GIAY_KHACHHANG } from "./ConstantVariable";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import styles from "./DanhMucGiayKhachHang.module.scss";

const DanhMucGiayKhachHang = ({
  formInfoDonHang,
  dataOrigin,
  setInfoSelection,
}) => {
  console.log("info ben nay khi truyen qua: ", formInfoDonHang);
  const [rowSelection, setRowSelection] = useState({});
  const [stateTable, dispatchTable] = useTableContext();
  const [dataTable, setDataTable] = useState([]);

  const infoColumns = useMemo(() => {
    return processingInfoColumnTable(COL_GIAY_KHACHHANG);
  }, []);

  useEffect(() => {
    console.log("info ben nay: ", formInfoDonHang);
    if (formInfoDonHang["MAKH"] !== "") {
      fetch(
        "http://localhost:8000/donhang/khachhang/" +
          formInfoDonHang["MAKH"] +
          "/giay"
      )
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          console.log(info);
          setDataTable(info);
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    }
  }, []);

  const handleSubmit = () => {
    const columns_selected = [];
    for (var key in rowSelection) {
      if (!isNaN(key)) {
        const info = {
          ...dataTable[key],
          ...formInfoDonHang,
          SIZE0: 0,
          SIZE5: 0,
          SIZE6: 0,
          SIZE7: 0,
          SIZE8: 0,
          SIZE9: 0,
          SOLUONG: 0,
          THANHTIEN: 0,
          DAPHANCONG: 0,
        };
        columns_selected.push(info);
      }
    }

    setInfoSelection([
      ...dataOrigin.slice(0, -1),
      ...columns_selected,
      dataOrigin[dataOrigin.length - 1],
    ]);
    dispatchTable(actions_table.setModeShowModal(false));
  };

  return (
    <>
      <MaterialReactTable
        columns={infoColumns}
        data={dataTable}
        // row selection
        enableRowSelection
        onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
        state={{ rowSelection }} //pass our managed row selection state to the table to use
        // knmhgk
        enableTopToolbar={false}
        enablePagination={false}
        // scroll to bottom
        enableRowVirtualization
        muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
        // group Mã giày
        enableGrouping
        initialState={{ grouping: ["MAGIAY"], expanded: true }}
      />
      <div className={styles.group_button}>
        <button onClick={handleSubmit}>Đồng ý</button>
        <button>Đóng</button>
      </div>
    </>
  );
};

export default DanhMucGiayKhachHang;
