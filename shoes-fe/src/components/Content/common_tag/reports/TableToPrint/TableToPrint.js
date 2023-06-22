import MaterialReactTable from "material-react-table";

const TableToPrint = ({ columns, data }) => {
  return (
    <MaterialReactTable
      muiTablePaperProps={{
        //customize paper styles
        sx: {
          borderRadius: "0",
          borderLeft: "0.2rem solid rgba(0, 0, 0, 0.9)",
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          borderRight: "0.2rem solid rgba(0, 0, 0, 0.9)",
          borderBottom: "0.2rem solid rgba(0, 0, 0, 0.9)",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          borderRight: "0.2rem solid rgba(0, 0, 0, 0.9)",
          borderBottom: "0.2rem solid rgba(0, 0, 0, 0.9)",
        },
      }}
      muiTableFooterCellProps={{
        sx: {
          borderRight: "0.2rem solid rgba(0, 0, 0, 0.9)",
          borderBottom: "0.2rem solid rgba(0, 0, 0, 0.9)",
        },
      }}
      muiTableContainerProps={{
        sx: {
          border: "none",
          borderTop: "0.2rem solid rgba(0, 0, 0, 0.9)",
        },
      }}
      enableTopToolbar={false}
      columns={columns}
      data={data}
      // components
      enableColumnActions={false}
      enableSorting={false}
      // enable phân trang
      enablePagination={false}
      enableBottomToolbar={false}
    />
  );
};

export default TableToPrint;
