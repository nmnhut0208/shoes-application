import MaterialReactTable from "material-react-table";
import { memo } from "react";
import { border_text_table_config } from "~config/ui";

const TableDonHang = ({
  columns,
  data,
  maxHeight,
  rowSelection,
  setRowSelection,
}) => {
  console.log("render TableDonHang: ");
  return (
    <div>
      <MaterialReactTable
        {...border_text_table_config}
        enableTopToolbar={true}
        // initialState={{ showColumnFilters: true }}
        enableBottomToolbar={false}
        columns={columns}
        data={data}
        enableRowNumbers
        // components
        enableColumnActions={false}
        enableSorting={false}
        enableColumnResizing
        // initialState={{ pagination: { pageSize: row_each_page, pageIndex: 0 } }}
        // enablePinning
        // enable phân trang
        enablePagination={false}
        // scroll to bottom
        enableRowVirtualization
        muiTableContainerProps={{
          sx: { maxHeight: [maxHeight, "rem"].join("") },
        }}
        // row selection
        enableMultiRowSelection={false}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
      />
    </div>
  );
};

export default memo(TableDonHang);
