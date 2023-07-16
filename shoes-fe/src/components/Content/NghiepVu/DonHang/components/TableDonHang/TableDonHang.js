import { memo } from "react";
import { Typography } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { border_text_table_config } from "~config/ui";

const TableDonHang = ({ columns, data, setDataTable, readOnly }) => {
  console.log("render TableDonHang");

  const handleDeleteRow = (row) => {
    let index = row.index;
    data.splice(index, 1);
    setDataTable([...data]);
  };

  return (
    <div>
      <MaterialReactTable
        {...border_text_table_config}
        enableTopToolbar={false}
        columns={columns}
        data={data}
        enableColumnActions={false}
        enableSorting={false}
        enableColumnResizing
        // enable phân trang
        enablePagination={false}
        // scroll to bottom
        enableRowVirtualization
        muiTableContainerProps={{ sx: { maxHeight: "45rem" } }}
        enableRowNumbers //  enable row numbers thay cho STT
        // enablePinning // enable pinning
        // footer sum
        enableStickyFooter
        renderBottomToolbarCustomActions={() => (
          <>
            {!readOnly && (
              <Typography
                sx={{ fontStyle: "italic", p: "0 1rem" }}
                variant="body2"
              >
                Click a Cell to Edit
              </Typography>
            )}
          </>
        )}
        // add action in row
        // enableRowActions={!readOnly}
        // renderRowActions={({ row, table }) => (
        //   <Box
        //     sx={{
        //       display: "flex",
        //       "align-content": "center",
        //       // "flex-direction": "row",
        //     }}
        //   >
        //     {row.original["MAGIAY"] !== "" && (
        //       <Tooltip arrow title="Delete">
        //         <IconButton color="error" onClick={() => handleDeleteRow(row)}>
        //           <Delete />
        //         </IconButton>
        //       </Tooltip>
        //     )}
        //   </Box>
        // )}
      />
    </div>
  );
};

export default memo(TableDonHang);
