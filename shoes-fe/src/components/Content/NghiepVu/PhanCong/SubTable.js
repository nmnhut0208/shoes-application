import MaterialReactTable from "material-react-table";

const SubTable = ({ row_each_page, columns, data, maxHeight }) => {
  return (
    <div>
      <MaterialReactTable
        enableTopToolbar={false}
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
          sx: { maxHeight: [maxHeight, "px"].join("") },
        }}
      />
    </div>
  );
};

export default SubTable;
