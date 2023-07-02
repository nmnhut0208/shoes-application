import MaterialReactTable from "material-react-table";

const TableToPrint = ({ columns, data, border_text_table_config }) => {
  return (
    <MaterialReactTable
      {...border_text_table_config}
      muiTableProps={{
        sx: {
          tableLayout: "fixed",
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
