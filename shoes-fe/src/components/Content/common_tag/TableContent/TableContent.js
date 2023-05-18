import { Modal } from "~common_tag";
import MaterialReactTable from "material-react-table";
import { TableTitle } from "material-react-table";
import { useTableContext, actions_table } from "~table_context";
import { useTaskContext } from "~task";
// import "./table_ant.css";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMemo } from "react";

const TableContent = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [stateTask, dispatchTask] = useTaskContext();
  const inforShowTable = stateTable["inforShowTable"];
  const ComponentForm = stateTable["infoShowForm"]["component_form"];

  console.log("resize: ", inforShowTable.infoColumnTable);

  const emptyData = useMemo(() => {
    const emptyData = {};
    inforShowTable.infoColumnTable.forEach((item) => {
      emptyData[item["key"]] = "";
    });
    return emptyData;
  }, []);

  console.log("emptyData: ", emptyData);

  const handleDeleteRow = (row) => {
    console.log("case: ", stateTask.inforCurrentTask.infoDetail);
    switch (stateTask.inforCurrentTask.infoDetail) {
      case "Kho hàng":
        fetch("http://localhost:8000/khohang", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(row),
        })
          .then((res) => console.log("response: ", res))
          .catch((err) => console.log("error: ", err));
        break;
      case "Mũi":
        fetch("http://localhost:8000/mui", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(row),
        })
          .then((res) => console.log("response: ", res))
          .catch((err) => console.log("error: ", err));
        break;
      case "Đế":
        fetch("http://localhost:8000/de", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(row),
        })
          .then((res) => console.log("response: ", res))
          .catch((err) => console.log("error: ", err));
        break;
      case "Cá":
        fetch("http://localhost:8000/ca", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(row),
        })
          .then((res) => console.log("response: ", res))
          .catch((err) => console.log("error: ", err));
        break;
      case "Nhân viên":
        fetch("http://localhost:8000/nhanvien", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(row),
        })
          .then((res) => console.log("response: ", res))
          .catch((err) => console.log("error: ", err));
        break;
      case "Kỳ tính lương":
        fetch("http://localhost:8000/kytinhluong", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(row),
        })
          .then((res) => console.log("response: ", res))
          .catch((err) => console.log("error: ", err));
        break;
    }
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
            // columnResizeMode="onChange" //default
            enableRowNumbers
            enableEditing
            // onEditingRowSave={handleSaveRowEdits}
            // onEditingRowCancel={handleCancelRowEdits}
            renderRowActions={({ row, table }) => (
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <Tooltip arrow placement="right" title="Add">
                  <IconButton
                    style={{ width: "30px" }}
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
                <Tooltip arrow placement="right" title="Edit">
                  <IconButton
                    style={{ width: "30px" }}
                    onClick={() => {
                      console.log("row: ", row.original);
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
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    style={{ width: "30px" }}
                    color="error"
                    onClick={() => handleDeleteRow(row.original)}
                  >
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
