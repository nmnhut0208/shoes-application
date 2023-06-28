import { useState } from "react";
import { Typography } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useTableContext, actions_table } from "~table_context";
import { border_text_table_config } from "~config/ui";

const SubTable = ({
  columns,
  data,
  setShowForm,
  //   rowSelection,
  //   setRowSelection,
  maxHeight,
}) => {
  //   console.log("data: ", data);
  const [stateTable, dispatchTable] = useTableContext();

  return (
    <MaterialReactTable
      {...border_text_table_config}
      columns={columns}
      data={data}
      components
      enableColumnResizing
      enableRowNumbers
      enableEditing
      enableColumnActions={false}
      enableSorting={false}
      enableSelectAll={false}
      //   enableRowSelection
      //   getRowId={(row) => row.userId}
      //   onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
      //   state={{ rowSelection }}
      enableTopToolbar={false}
      enableBottomToolbar={false}
      enablePagination={false}
      muiTableContainerProps={{ sx: { maxHeight: { maxHeight } } }}
      enableRowVirtualization
      enableStickyFooter
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip arrow placement="right" title="Edit">
            <IconButton
              onClick={() => {
                // setShowForm(true);
                // dispatchTable(actions_table.setModeShowModal(true));
                // dispatchTable(actions_table.setInforRecordTable(emptyData));
                // dispatchTable(actions_table.setActionForm("add"));
                console.log("set show");
                dispatchTable(actions_table.setModeShowModal(true));
                setShowForm(true);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    />
  );
};

export default SubTable;
