import { useState, useMemo, useEffect, memo } from "react";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import MaterialReactTable from "material-react-table";
import { COL_KHACHHANG } from "./ConstantVariable";
import { useItemsContext } from "~items_context";
import { border_text_table_config } from "~config/ui";

const ListKhachHang = ({ changeData }) => {
  const [data, setData] = useState([]);
  const [stateItem, dispatchItem] = useItemsContext();
  const [rowSelection, setRowSelection] = useState({});
  useEffect(() => {
    setData(stateItem.infoItemKhachHang);
  }, []);
  useEffect(() => {
    let keys = Object.keys(rowSelection);
    if (keys.length > 0) {
      changeData({
        MAKH: data[keys[0]]["MAKH"],
        TENKH: data[keys[0]]["TENKH"],
      });
    }
  }, [rowSelection]);

  const columns_kh = useMemo(() => {
    return processingInfoColumnTable(COL_KHACHHANG);
  }, []);

  return (
    <div style={{ height: "auto" }}>
      <MaterialReactTable
        {...border_text_table_config}
        enableTopToolbar={false}
        columns={columns_kh}
        data={data}
        // components
        enableColumnActions={false}
        enableSorting={false}
        // enable phân trang
        enablePagination={false}
        enableBottomToolbar={true}
        // row selection
        enableMultiRowSelection={false}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
        // scroll to bottom
        // enableRowVirtualization // comment this line
        muiTableContainerProps={{
          sx: { height: "30rem" },
        }}
      />
    </div>
  );
};

export default memo(ListKhachHang);
