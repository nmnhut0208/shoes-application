import MaterialReactTable from "material-react-table";

const TableToPrint = ({ columns, data }) => {
  return (
    <MaterialReactTable
      muiTablePaperProps={{
        elevation: 0,
        //customize paper styles
        sx: {
          //   fontWeight: "520",
          //   fontSize: "2rem",
          //   fontFamily: "Times New Roman",
          borderRadius: "0",
          borderLeft: "0.25rem solid rgba(0, 0, 0, 1)",
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          // fontWeight: "550",
          fontSize: "2rem",
          fontFamily: "Times New Roman",
          padding: "0.5rem",
          borderRight: "0.25rem solid rgba(0, 0, 0, 1)",
          borderBottom: "0.25rem solid rgba(0, 0, 0, 1)",
        },
      }}
      muiTableHeadCellFilterTextFieldProps={{
        sx: {
          fontSize: "22px !important",
          padding: "1rem",
          fontFamily: "'Times New Roman' !important",
          fontWeight: "900",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          // fontSize: "22px !important",
          // padding: "1rem",
          // fontFamily: "'Times New Roman' !important",
          // fontWeight: "900",
          // backgroundColor: "red",
          borderRight: "0.25rem solid rgba(0, 0, 0, 1)",
          borderBottom: "0.25rem solid rgba(0, 0, 0, 1)",
        },
      }}
      muiTableFooterCellProps={{
        sx: {
          // fontWeight: "550",
          fontSize: "2rem",
          fontFamily: "Times New Roman",
          borderRight: "0.25rem solid rgba(0, 0, 0, 1)",
          borderBottom: "0.25rem solid rgba(0, 0, 0, 1)",
        },
      }}
      muiTableContainerProps={{
        sx: {
          // fontWeight: "550",
          fontSize: "2rem",
          fontFamily: "Times New Roman",
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
