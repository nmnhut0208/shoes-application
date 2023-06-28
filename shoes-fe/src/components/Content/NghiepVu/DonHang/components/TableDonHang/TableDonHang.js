import { memo } from "react";
import { Typography } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { border_text_table_config } from "~config/ui";

const TableDonHang = ({
  columns,
  data,
  setDataTable,
  handleAddGiay,
  readOnly,
}) => {
  console.log("data: ", data);
  const handleSaveCell = (cell, value) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
    var row_current = data[cell.row.index];
    // Tính lại tại thay đổi tại dòng hiện tại đang chỉnh sửa
    // Tính lại số lượng
    var list_size = ["SIZE5", "SIZE6", "SIZE7", "SIZE8", "SIZE9", "SIZE0"];
    if (list_size.includes(cell.column.id)) {
      if (value === "") value = 0;
      row_current[cell.column.id] = parseInt(value);

      var so_luong = 0;
      for (var i = 0; i < list_size.length; i++) {
        so_luong += row_current[list_size[i]];
      }
      row_current["SOLUONG"] = so_luong;
      row_current["THANHTIEN"] = row_current["SOLUONG"] * row_current["GIABAN"];
      data[cell.row.index] = row_current;
    } else {
      data[cell.row.index][cell.column.id] = value;
    }

    //send/receive api updates here
    setDataTable([...data]); //re-render with new data
  };

  const handleDeleteRow = (row) => {
    let index = row.index;
    data.splice(index, 1);
    setDataTable([...data]);
  };

  return (
    <div>
      <Tooltip arrow title="Add">
        <IconButton
          onClick={() => {
            handleAddGiay();
          }}
        >
          <AddCircleIcon style={{ color: "green" }} fontSize="large" />
        </IconButton>
      </Tooltip>
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
        // edit each cell in row
        editingMode="table"
        enableEditing={!readOnly}
        muiTableBodyCellEditTextFieldProps={({ cell }) => ({
          //onBlur is more efficient, but could use onChange instead
          onBlur: (event) => {
            handleSaveCell(cell, event.target.value);
          },
        })}
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
        enableRowActions={!readOnly}
        renderRowActions={({ row, table }) => (
          <Box
            sx={{
              display: "flex",
              "align-content": "center",
              // "flex-direction": "row",
            }}
          >
            {row.original["MAGIAY"] !== "" && (
              <Tooltip arrow title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
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

export default memo(TableDonHang);
