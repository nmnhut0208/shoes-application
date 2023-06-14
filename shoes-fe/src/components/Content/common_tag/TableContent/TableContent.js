import { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Delete, Edit } from "@mui/icons-material";

import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";
import { useTaskContext } from "~task";
import { useUserContext } from "~user";

const listFormHaveViewDetail = ["F0024", "F0020", "F0013", "F0018"];

const TableContent = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  const inforShowTable = stateTable["inforShowTable"];
  const ComponentForm = stateTable["infoShowForm"]["component_form"];
  const maForm = stateTable["inforShowTable"]["title"].split(" - ")[1];
  const permission = useMemo(() => {
    return stateUser.userPoolAccess.filter((obj) => obj.MAFORM === maForm)[0];
  }, []);
  const showActionColumn = useMemo(() => {
    if (permission.THEM + permission.SUA + permission.XOA > 0) {
      return true;
    } else {
      if (permission.XEM === 1 && listFormHaveViewDetail.includes(maForm))
        return true;
      else return false;
    }
  }, []);

  console.log("resize: ", inforShowTable.infoColumnTable);

  const emptyData = useMemo(() => {
    const emptyData = {};
    inforShowTable.infoColumnTable.forEach((item) => {
      emptyData[item["key"]] = "";
    });
    return emptyData;
  }, []);

  const handleDeleteRow = (row) => {
    let url = "";
    switch (stateTask.inforCurrentTask.infoDetail) {
      case "Kho hàng":
        url = "http://localhost:8000/khohang";
        break;
      case "Mũi":
        url = "http://localhost:8000/mui";
        break;
      case "Đế":
        url = "http://localhost:8000/de";
        break;
      case "Cá":
        url = "http://localhost:8000/ca";
        break;
      case "Nhân viên":
        url = "http://localhost:8000/nhanvien";
        break;
      case "Kỳ tính lương":
        url = "http://localhost:8000/kytinhluong";
        break;
      case "Giày":
        url = "http://localhost:8000/giay";
        break;
      case "Màu":
        url = "http://localhost:8000/mau";
        break;
      case "Sườn":
        url = "http://localhost:8000/suon";
        break;
      case "Gót":
        url = "http://localhost:8000/got";
        break;
      case "Quai":
        url = "http://localhost:8000/quai";
        break;
      case "Khách hàng":
        url = "http://localhost:8000/khachhang";
        break;
      case "Phân quyền":
        url = "http://localhost:8000/phanquyen";
        break;
    }
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
    })
      .then((res) => console.log("response: ", res))
      .catch((err) => console.log("error: ", err));
    const newData = inforShowTable.infoTable.filter((item) => item != row);
    dispatchTable(actions_table.setInforTable(newData));
  };

  return (
    <>
      {inforShowTable.showTable && (
        <div>
          <header>{inforShowTable.title}</header>
          <MaterialReactTable
            columns={inforShowTable.infoColumnTable}
            data={inforShowTable.infoTable}
            components
            autoResetPageIndex={false}
            // resize width of each column
            enableColumnResizing
            enableRowNumbers
            enableEditing={showActionColumn}
            displayColumnDefOptions={{
              "mrt-row-actions": {
                size: 130, //set custom width
                muiTableHeadCellProps: {
                  align: "center", //change head cell props
                },
                enableResizing: true,
              },
              "mrt-row-numbers": {
                size: 60,
                enableColumnOrdering: true, //turn on some features that are usually off
                enableResizing: true,
              },
            }}
            renderRowActions={({ row, table }) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {permission.THEM === 1 && (
                  <Tooltip arrow placement="right" title="Add">
                    <IconButton
                      onClick={() => {
                        dispatchTable(
                          actions_table.setInforRecordTable(emptyData)
                        );
                        dispatchTable(actions_table.setActionForm("add"));
                        dispatchTable(actions_table.setModeShowModal(true));
                      }}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {permission.SUA === 1 && (
                  <Tooltip arrow placement="right" title="Edit">
                    <IconButton
                      onClick={() => {
                        dispatchTable(
                          actions_table.setInforRecordTable(row.original)
                        );
                        dispatchTable(actions_table.setActionForm("edit"));
                        dispatchTable(actions_table.setModeShowModal(true));
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                )}
                {permission.XOA === 1 && (
                  <Tooltip arrow placement="right" title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => {
                        handleDeleteRow(row.original);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                )}

                {permission.XEM === 1 &&
                  permission.THEM === 0 &&
                  permission.SUA === 0 &&
                  listFormHaveViewDetail.includes(maForm) && (
                    <Tooltip arrow placement="right" title="View Detail">
                      <IconButton
                        onClick={() => {
                          dispatchTable(
                            actions_table.setInforRecordTable(row.original)
                          );
                          dispatchTable(actions_table.setActionForm("view"));
                          dispatchTable(actions_table.setModeShowModal(true));
                        }}
                      >
                        <VisibilityOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
              </Box>
            )}
          />
        </div>
      )}

      <Modal>
        <ComponentForm />
      </Modal>
    </>
  );
};
export default TableContent;
