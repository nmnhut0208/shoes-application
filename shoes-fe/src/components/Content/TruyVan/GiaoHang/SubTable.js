import { useState } from "react";
import { Typography } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useTableContext, actions_table } from "~table_context";
import { useUserContext, actions } from "~user";
import { border_text_table_config } from "~config/ui";

const SubTable = ({
  columns,
  data,
  setShowForm,
  setSendData,
  setDataTable,
  //   rowSelection,
  //   setRowSelection,
  maxHeight,
}) => {
  //   console.log("data: ", data);
  const [stateUser, dispatchUser] = useUserContext();
  const maForm = "F0033";
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
      enableTopToolbar={true}
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
                if (
                  stateUser.userPoolAccess.some(
                    (obj) => obj.MAFORM === maForm && obj.SUA === 1
                  )
                ) {
                  setShowForm(true);
                  setSendData(row.original);
                  // dispatchTable(actions_table.setModeShowModal(true));
                  // console.log("row: ", row.original);
                  // dispatchTable(actions_table.setInforRecordTable(emptyData));
                  // dispatchTable(actions_table.setActionForm("add"));
                  // dispatchTable(actions_table.setModeShowModal(true));
                } else {
                  alert("Bạn không có quyền sửa");
                }
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton
              color="error"
              onClick={() => {
                console.log("delete: ", row.original);
                if (
                  stateUser.userPoolAccess.some(
                    (obj) => obj.MAFORM === maForm && obj.XOA === 1
                  )
                ) {
                  let text = "Bạn thực sự muốn xóa thông tin này không!";
                  if (!window.confirm(text)) {
                    return;
                  }
                  fetch("http://localhost:8000/tv_giaohang", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(row.original),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.status === "success") {
                        fetch("http://localhost:8000/tv_giaohang")
                          .then((response) => {
                            return response.json();
                          })
                          .then((info) => {
                            setDataTable(info);
                          })
                          .catch((err) => {
                            console.log(":error: ", err);
                          });
                        // alert("Xóa thành công");
                      } else {
                        alert("Xóa thất bại");
                      }
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                } else {
                  alert("Bạn không có quyền xóa");
                }
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    />
  );
};

export default SubTable;
