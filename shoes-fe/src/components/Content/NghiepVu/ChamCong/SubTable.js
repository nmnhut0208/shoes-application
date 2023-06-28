import { useState } from "react";
import { Typography } from "@mui/material";
import { border_text_table_config } from "~config/ui";
import MaterialReactTable from "material-react-table";

const SubTable = ({
  columns,
  data,
  rowSelection,
  flag_rowSelection,
  setRowSelection,
  maxHeight,
}) => {
  //   console.log("data: ", data);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      {...border_text_table_config}
      enableColumnResizing
      enableColumnActions={false}
      enableSorting={false}
      enableSelectAll={false}
      enableMultiRowSelection={false}
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
