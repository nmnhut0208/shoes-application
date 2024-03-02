import { memo } from "react";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import MaterialReactTable from "material-react-table";
import { COL_KHACHHANG } from "./ConstantVariable";
import { border_text_table_config } from "~config/ui";

let columns_kh = processingInfoColumnTable(COL_KHACHHANG);
const TableMaKH = ({ data, rowSelection, setRowSelection }) => {
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
      />
    </div>
  );
};

export default memo(TableMaKH);
