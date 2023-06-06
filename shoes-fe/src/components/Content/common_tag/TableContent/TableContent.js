import { Modal } from "~common_tag";
import MaterialReactTable from "material-react-table";
import { TableTitle } from "material-react-table";
import { useTableContext, actions_table } from "~table_context";
import { useTaskContext } from "~task";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMemo } from "react";
import { useUserContext } from "~user";

const TableContent = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  const inforShowTable = stateTable["inforShowTable"];
  const ComponentForm = stateTable["infoShowForm"]["component_form"];
  const maForm = stateTable["inforShowTable"]["title"].split(" - ")[1];

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
            displayColumnDefOptions={{
              "mrt-row-actions": { size: 120 },
              "mrt-row-numbers": { size: 60 },
            }}
            components
            autoResetPageIndex={false}
            // resize width of each column
            enableColumnResizing
            // columnResizeMode="onChange" //default
            enableRowNumbers
            enableEditing
            renderRowActions={({ row, table }) => (
              <Box
                sx={{
                  display: "flex",
                  // gap: "2px",
                  // flexWrap: "wrap",
                  justifyContent: "center",
                }}>
                <Tooltip arrow placement="right" title="Add">
                  <IconButton
                    onClick={() => {
                      if (
                        stateUser.userPoolAccess.some(
                          (obj) => obj.MAFORM === maForm && obj.THEM === 1
                        )
                      ) {
                        dispatchTable(
                          actions_table.setInforRecordTable(emptyData)
                        );
                        dispatchTable(actions_table.setActionForm("add"));
                        dispatchTable(actions_table.setModeShowModal(true));
                      } else {
                        alert("Bạn không có quyền thêm kho hàng");
                      }
                    }}>
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Edit">
                  <IconButton
                    onClick={() => {
                      if (
                        stateUser.userPoolAccess.some(
                          (obj) => obj.MAFORM === maForm && obj.SUA === 1
                        )
                      ) {
                        dispatchTable(
                          actions_table.setInforRecordTable(row.original)
                        );
                        dispatchTable(actions_table.setActionForm("edit"));
                        dispatchTable(actions_table.setModeShowModal(true));
                      } else {
                        alert("Bạn không có quyền sửa kho hàng");
                      }
                    }}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => {
                      if (
                        stateUser.userPoolAccess.some(
                          (obj) => obj.MAFORM === maForm && obj.XOA === 1
                        )
                      ) {
                        handleDeleteRow(row.original);
                      }
                    }}>
                    <Delete />
                  </IconButton>
                </Tooltip>
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
