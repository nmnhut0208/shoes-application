import MaterialReactTable from "material-react-table";
import { memo } from "react";

const TableDonHang = ({ row_each_page, columns, data, maxHeight }) => {
  console.log("re-render table: ", maxHeight);
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
        // initialState={{ pagination: { pageSize: row_each_page, pageIndex: 0 } }}
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

export default memo(TableDonHang);
