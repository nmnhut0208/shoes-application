import MaterialReactTable from "material-react-table";
import { memo } from "react";

const TableChiTietPhanCong = ({
  columns,
  data,
  maxHeight,
  rowSelection,
  setRowSelection,
}) => {
  return (
    <div>
      <MaterialReactTable
        enableTopToolbar={false}
        enableBottomToolbar={false}
        columns={columns}
        data={data}
        enableRowNumbers
        // components
        enableColumnActions={false}
        enableSorting={false}
        enableColumnResizing
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

export default memo(TableChiTietPhanCong);
