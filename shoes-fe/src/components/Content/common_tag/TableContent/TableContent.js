import { Table } from "antd";
import { Modal } from "~common_tag";
import MaterialReactTable from "material-react-table";
import { TableTitle } from "material-react-table";
import { useTableContext, actions_table } from "~table_context";
import "./table_ant.css";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

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
  const inforShowTable = stateTable["inforShowTable"];
  const ComponentForm = stateTable["infoShowForm"]["component_form"];

  console.log("resize: ", inforShowTable.infoColumnTable);

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
            defaultColumn={{
              maxSize: 400,
              minSize: 80,
              size: 150, //default size is usually 180
            }}
            enableColumnResizing
            // columnResizeMode="onChange" //default
            enableEditing
            // onEditingRowSave={handleSaveRowEdits}
            // onEditingRowCancel={handleCancelRowEdits}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton
                    onClick={() => {
                      dispatchTable(
                        actions_table.setInforRecordTable(row.original)
                      );
                      dispatchTable(actions_table.setModeShowModal(true));
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    // onClick={() => handleDeleteRow(row)}
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
