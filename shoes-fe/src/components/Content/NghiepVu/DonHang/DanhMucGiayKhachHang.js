import { useEffect, useState, useMemo } from "react";
import MaterialReactTable from "material-react-table";
// import SubTable from "./SubTable";
// import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";
import { COL_GIAY_KHACHHANG } from "./config";
import styles from "./DonHang.module.scss";

const DanhMucGiayKhachHang = ({
  id_khachhang,
  dataOrigin,
  setInfoSelection,
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const [stateTable, dispatchTable] = useTableContext();
  const [dataTable, setDataTable] = useState([]);

  const infoColumns = useMemo(() => {
    const infoColumnsInit = [];
    for (var obj in COL_GIAY_KHACHHANG) {
      let key = COL_GIAY_KHACHHANG[obj]["key"];
      var info = {
        header: COL_GIAY_KHACHHANG[obj]["key"],
        size: COL_GIAY_KHACHHANG[obj]["width"],
        accessorKey: COL_GIAY_KHACHHANG[obj]["key"],
        enableEditing: COL_GIAY_KHACHHANG[obj]["enableEditing"],
        key: COL_GIAY_KHACHHANG[obj]["key"].toLowerCase(),
      };
      infoColumnsInit.push(info);
    }
    return infoColumnsInit;
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/items_danhmuc_giay_khachhang")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataTable(info);
        console.log(dataTable);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  const handleSubmit = () => {
    const columns_selected = [];
    console.log("rowSelection: ", rowSelection);
    for (var key in rowSelection) {
      console.log(key, dataTable[key]);
      const info = {
        ...dataTable[key],
        "Size 0": 0,
        "Size 5": 0,
        "Size 6": 0,
        "Size 7": 0,
        "Size 8": 0,
        "Size 9": 0,
        "Số lượng": 0,
      };
      columns_selected.push(info);
    }
    console.log("data updated: ", [...dataOrigin, ...columns_selected]);
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
        enableRowSelection
        getRowId={(row) => row.userId} //give each row a more useful id
        onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
        state={{ rowSelection }} //pass our managed row selection state to the table to use
        // knmhgk
        enableTopToolbar={false}
        enablePagination={false}
        // scroll to bottom
        enableRowVirtualization
        muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
      />
      <div className={styles.group_button}>
        <button onClick={handleSubmit}>Đồng ý</button>
        <button>Đóng</button>
      </div>
    </>
  );
};

export default DanhMucGiayKhachHang;
