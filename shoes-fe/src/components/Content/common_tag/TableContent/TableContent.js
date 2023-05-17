import { Table } from "antd";
import { Modal } from "~common_tag";
import MaterialReactTable from "material-react-table";
import { TableTitle } from "material-react-table";
import { useTableContext, actions_table } from "~table_context";
import { useTaskContext } from "~task";
import "./table_ant.css";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMemo } from "react";

const columns = [
  {
    accessorKey: "firstName",
    header: "First Name", //uses the default width from defaultColumn prop
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    enableResizing: false, //disable resizing for this column
  },
  {
    accessorKey: "email",
    header: "Email Address",
    size: 200, //increase the width of this column
  },
  {
    accessorKey: "city",
    header: "City",
    size: 120, //decrease the width of this column
  },
  {
    accessorKey: "country",
    header: "Country",
    size: 100, //decrease the width of this column
  },
];

const data = [
  {
    firstName: "Dylan",
    lastName: "Murray",
    email: "dmurray@yopmail.com",
    city: "East Daphne",
    country: "USA",
  },
  {
    firstName: "Raquel",
    lastName: "Kohler",
    email: "rkholer33@yopmail.com",
    city: "Columbus",
    country: "USA",
  },
  {
    firstName: "Ervin",
    lastName: "Reinger",
    email: "ereinger@mailinator.com",
    city: "Toronto",
    country: "Canada",
  },
  {
    firstName: "Brittany",
    lastName: "McCullough",
    email: "bmccullough44@mailinator.com",
    city: "Lincoln",
    country: "USA",
  },
  {
    firstName: "Branson",
    lastName: "Frami",
    email: "bframi@yopmain.com",
    city: "New York",
    country: "USA",
  },
  {
    firstName: "Branson",
    lastName: "Frami",
    email: "bframi@yopmain.com",
    city: "New York",
    country: "USA",
  },
];

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
        // <Table
        //   pagination={{ defaultPageSize: 15 }}
        //   title={() => <div>{inforShowTable.title}</div>}
        //   columns={inforShowTable.infoColumnTable}
        //   dataSource={inforShowTable.infoTable}
        //   scroll={{
        //     x: 1300,
        //     y: 500,
        //   }}
        //   onRow={(record) => {
        //     return {
        //       onDoubleClick: () => {
        //         dispatchTable(actions_table.setInforRecordTable(record));
        //         dispatchTable(actions_table.setModeShowModal(true));
        //       },
        //     };
        //   }}
        // />
        <div>
          <header>{inforShowTable.title}</header>
          <MaterialReactTable
            columns={inforShowTable.infoColumnTable}
            data={inforShowTable.infoTable}
            components
            // handle double click row
            //optionally override the default column widths
            // defaultColumn={{
            //   maxSize: 400,
            //   minSize: 80,
            //   size: 150, //default size is usually 180
            // }}
            enableColumnResizing
            enableRowNumbers
            // columnResizeMode="onChange" //default
            enableEditing
            // onEditingRowSave={handleSaveRowEdits}
            // onEditingRowCancel={handleCancelRowEdits}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
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
                <Tooltip arrow placement="right" title="Edit">
                  <IconButton
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
