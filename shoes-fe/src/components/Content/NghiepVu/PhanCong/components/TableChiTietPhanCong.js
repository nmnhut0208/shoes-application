import MaterialReactTable from "material-react-table";
import { memo } from "react";

const TableChiTietPhanCong = ({ columns, data, maxHeight }) => {
  return (
    <div>
      <MaterialReactTable
        enableTopToolbar={false}
        enableBottomToolbar={false}
        columns={columns}
        data={data}
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
      />
    </div>
  );
};

export default memo(TableChiTietPhanCong);
