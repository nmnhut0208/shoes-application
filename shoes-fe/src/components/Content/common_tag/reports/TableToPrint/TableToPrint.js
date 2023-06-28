import MaterialReactTable from "material-react-table";

const fontFamily = "Helvetica";
// ("Times New Roman");

const TableToPrint = ({ columns, data }) => {
  return (
    <MaterialReactTable
      muiTablePaperProps={{
        elevation: 0,
        //customize paper styles
        sx: {
          borderRadius: "0",
          borderLeft: "0.25rem solid rgba(0, 0, 0, 1)",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          fontSize: "2.5rem",
          padding: "1rem",
          lineHeight: "2.9rem",
          fontFamily: "Gill Sans",
          fontWeight: "900",
          borderRight: "0.25rem solid rgba(0, 0, 0, 1)",
          borderBottom: "0.25rem solid rgba(0, 0, 0, 1)",
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          // fontWeight: "550",
          fontSize: "2rem",
          fontFamily: fontFamily,
          padding: "0.5rem",
          borderRight: "0.25rem solid rgba(0, 0, 0, 1)",
          borderBottom: "0.25rem solid rgba(0, 0, 0, 1)",
        },
      }}
      muiTableFooterCellProps={{
        sx: {
          // fontWeight: "550",
          fontSize: "2rem",
          fontFamily: fontFamily,
          borderRight: "0.25rem solid rgba(0, 0, 0, 1)",
          borderBottom: "0.25rem solid rgba(0, 0, 0, 1)",
        },
      }}
      muiTableContainerProps={{
        sx: {
          // fontWeight: "550",
          fontSize: "2rem",
          fontFamily: fontFamily,
          border: "none",
          borderTop: "0.25rem solid rgba(0, 0, 0, 1)",
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
