import { useState } from "react";
import { Typography } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const SubTable = ({ columns, data, setDataTable, handleAddGiay }) => {
  const handleSaveCell = (cell, value) => {
    console.log("cell, value: ", cell, value);
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
    var row_current = data[cell.row.index];
    // Tính lại số lượng
    var list_size = [
      "Size 5",
      "Size 6",
      "Size 7",
      "Size 8",
      "Size 9",
      "Size 0",
    ];
    if (list_size.includes(cell.column.id)) {
      row_current[cell.column.id] = parseInt(value);

      var so_luong = 0;
      for (var i = 0; i < list_size.length; i++) {
        so_luong += row_current[list_size[i]];
      }
      row_current["Số lượng"] = so_luong;
      data[cell.row.index] = row_current;
    } else {
      data[cell.row.index][cell.column.id] = value;
    }

    //send/receive api updates here
    setDataTable([...data]); //re-render with new data
  };

  return (
    <div>
      <MaterialReactTable
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
        muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
        enableRowNumbers //  enable row numbers thay cho STT
        // enablePinning // enable pinning
        // footer sum
        enableStickyFooter
        // edit each cell in row
        editingMode="cell"
        enableEditing
        muiTableBodyCellEditTextFieldProps={({ cell }) => ({
          //onBlur is more efficient, but could use onChange instead
          onBlur: (event) => {
            handleSaveCell(cell, event.target.value);
          },
        })}
        renderBottomToolbarCustomActions={() => (
          <Typography sx={{ fontStyle: "italic", p: "0 1rem" }} variant="body2">
            Double-Click a Cell to Edit
          </Typography>
        )}
        // add action in row
        enableRowActions
        renderRowActions={({ row, table }) => (
          <Box
            sx={{
              display: "flex",
              "align-content": "center",
              // "flex-direction": "row",
            }}
          >
            {row.original["Mã giày"] === "" && (
              <Tooltip arrow title="Edit">
                <IconButton
                  onClick={() => {
                    console.log("row dang xem: ", row);
                    handleAddGiay();
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            )}
            {row.original["Mã giày"] !== "" && (
              <Tooltip arrow title="Delete">
                <IconButton
                  color="error"
                  // onClick={() => handleDeleteRow(row)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      />
    </div>
  );
};

export default SubTable;
