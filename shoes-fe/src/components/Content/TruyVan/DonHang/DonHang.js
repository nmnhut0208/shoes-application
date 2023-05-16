import MaterialReactTable from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";

import { processingInfoColumnTable } from "~utils/processing_data_table";
import { default as FormDonHang } from "~nghiep_vu/DonHang/";
import { INFO_COLS_DONHANG } from "./ConstantVariable";

const Table = ({ columns, data }) => {
  const [stateTable, dispatchTable] = useTableContext();
  const [rowInfo, setRowInfo] = useState({});
  const handleCheckDonHang = () => {
    dispatchTable(actions_table.setTitleModal("Đơn hàng - F0032"));
    dispatchTable(actions_table.setModeShowModal(true));
  };
  return (
    <>
      <MaterialReactTable
        enableTopToolbar={false}
        columns={columns}
        data={data}
        // components
        enableColumnActions={false}
        enableSorting={false}
        // enable phân trang
        enablePagination={false}
        enableBottomToolbar={true}
        // scroll to bottom
        enableRowVirtualization
        muiTableContainerProps={{
          sx: { maxHeight: "30rem" },
        }}
        // row number
        enableRowNumbers
        // add action in row
        enableRowActions={true}
        renderRowActions={({ row, table }) => (
          <Box
            sx={{
              display: "flex",
              "align-content": "center",
            }}
          >
            {
              // row.original["Số đơn hàng"] !== "" &&
              true && (
                <Tooltip arrow title="View">
                  <IconButton
                    onClick={() => {
                      console.log("row.original: ", row.original);
                      setRowInfo(row.original);
                      handleCheckDonHang();
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              )
            }
          </Box>
        )}
      />

      <Modal>
        <FormDonHang dataView={rowInfo} view={true} />
      </Modal>
    </>
  );
};

const DonHang = () => {
  const [dataDonHang, setDataDonHang] = useState([]);
  const column_donhang = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_DONHANG);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/items_donhang_truy_van")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataDonHang(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  return <Table columns={column_donhang} data={dataDonHang} />;
};

export default DonHang;
