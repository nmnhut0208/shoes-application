import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
// import SubTable from "./SubTable";
import { useTableContext, actions_table } from "~table_context";
import { Modal } from "~common_tag";
import FormChiTien from "./FormChiTien";
import { FormThuTien } from "~nghiep_vu/ThuTien";
import { border_text_table_config } from "~config/ui";

const list_key = [
  { header: "Số phiếu", key: "SOPHIEU" },
  { header: "Ngày phiếu", key: "NGAYPHIEU" },
  { header: "Khách hàng", key: "MAKH" },
  { header: "Tên khách hàng", key: "TENKH" },
  { header: "Số tiền", key: "SODUCUOI" },
  { header: "Diễn giải", key: "DIENGIAIPHIEU" },
];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    header: list_key[obj]["header"],
    width: list_key[obj]["width"],
    accessorKey: list_key[obj]["key"],
    key: list_key[obj]["key"],
  };
  infoColumns.push(info);
}

const url_data = {
  option1: "http://localhost:8000/tv_thuchi",
  option2: "http://localhost:8000/tv_thu",
  option3: "http://localhost:8000/tv_chi",
};

const TableThuChi = ({ option }) => {
  const [stateTable, dispatchTable] = useTableContext();
  const [dataTable, setDataTable] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // const [showForm, setShowForm] = useState(false);
  // const [rowSelection, setRowSelection] = useState({});

  const [dataRowChoose, setDataRowChoose] = useState({});
  console.log("dataRowChoose: ", dataRowChoose);

  console.log("TableThuChi");

  useEffect(() => {
    // dispatchTable(actions_table.setTitleModal("Kho hàng - F0025"));
    // dispatchTable(actions_table.setTitleTable("Kho hàng - F0024"));
    // if (option === "option1") {
    //   dispatchTable(actions_table.setComponentForm(null));
    // } else if (option === "option2") {
    //   dispatchTable(actions_table.setComponentForm(null));
    // } else if (option === "option3") {
    //   dispatchTable(actions_table.setComponentForm(FormChiTien));
    //   console.log("set form chi tien");
    // }
    console.log("url:", url_data[option]);
    fetch(url_data[option])
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataTable(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, [option]);

  return (
    <>
      {/* <SubTable
        columns={infoColumns}
        data={dataTable}
        setShowForm={setShowForm}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        maxHeight={"65rem"}
      /> */}
      <MaterialReactTable
        {...border_text_table_config}
        columns={infoColumns}
        data={dataTable}
        components
        enableColumnResizing
        enableRowNumbers
        enableEditing
        enableColumnActions={false}
        enableSorting={false}
        enableSelectAll={false}
        //row selection
        // enableRowSelection
        //   getRowId={(row) => row.userId}
        // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
        // state={rowSelection}
        enableTopToolbar={false}
        enableBottomToolbar={false}
        enablePagination={false}
        muiTableContainerProps={{ sx: { maxHeight: "65rem" } }}
        enableRowVirtualization
        enableStickyFooter
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="right" title="Edit">
              <IconButton
                onClick={() => {
                  console.log("set show");
                  setDataRowChoose(row.original);
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
      {/* {showForm && (
        <Modal>
          <FormChiTien />
        </Modal>
      )} */}

      {showForm && (
        <Modal>
          <FormThuTien dataView={dataRowChoose} type_action="edit" />
        </Modal>
      )}
    </>
  );
};

export default TableThuChi;
