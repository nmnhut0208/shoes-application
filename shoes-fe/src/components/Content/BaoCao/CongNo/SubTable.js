import MaterialReactTable from "material-react-table";
import { border_text_table_config } from "~config/ui";

const SubTable = ({
  columns,
  data,
  rowSelection,
  setRowSelection,
  flag_rowSelection,
  maxHeight,
}) => {
  return (
    <MaterialReactTable
      {...border_text_table_config}
      columns={columns}
      data={data}
      enableColumnResizing
      enableColumnActions={false}
      enableSorting={false}
      enableSelectAll={false}
      enableRowSelection={flag_rowSelection}
      //   getRowId={(row) => row.userId}
      onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
      state={{ rowSelection }}
      enableTopToolbar={false}
      enableBottomToolbar={false}
      enablePagination={false}
      muiTableContainerProps={{ sx: { maxHeight: { maxHeight } } }}
      enableRowVirtualization
      enableStickyFooter
    />
  );
};

export default SubTable;
