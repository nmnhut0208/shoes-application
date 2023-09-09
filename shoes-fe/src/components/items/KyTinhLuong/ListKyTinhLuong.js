import { useState, useMemo, useEffect, memo } from "react";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import MaterialReactTable from "material-react-table";
import { COL_KYTINHLUONG } from "./ConstantVariable";
import { useItemsContext } from "~items_context";
import { border_text_table_config } from "~config/ui";

const ListKyTinhLuong = ({ setValue, setLabel, showPopover }) => {
  const [data, setData] = useState([]);
  const [stateItem, dispatchItem] = useItemsContext();
  const [rowSelection, setRowSelection] = useState({});
  useEffect(() => {
    setData(stateItem.infoItemKyTinhLuong);
  }, []);
  useEffect(() => {
    let keys = Object.keys(rowSelection);
    if (keys.length > 0) {
      setValue(data[keys[0]]["MAKY"]);
      if (setLabel) setLabel(data[keys[0]]["TENKY"]);
      showPopover(false);
    }
  }, [rowSelection]);

  const columns = useMemo(() => {
    return processingInfoColumnTable(COL_KYTINHLUONG);
  }, []);

  return (
    <div style={{ height: "auto" }}>
      <MaterialReactTable
        {...border_text_table_config}
        enableTopToolbar={false}
        columns={columns}
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
        // enableRowVirtualization
        muiTableContainerProps={{
          sx: { height: "30rem" },
        }}
      />
    </div>
  );
};

export default memo(ListKyTinhLuong);
