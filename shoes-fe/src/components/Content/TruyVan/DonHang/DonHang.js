import MaterialReactTable from "material-react-table";
import { useMemo, useState } from "react";
import { Typography } from "@mui/material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";

import {
  renderDataEmpty,
  processingInfoColumnTable,
} from "~utils/processing_data_table";
import { default as FormDonHang } from "~nghiep_vu/DonHang/";
import { INFO_COLS_DONHANG } from "./ConstantVariable";

const Table = ({ columns, data, maxHeight, onCickOneRow }) => {
  return (
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
        sx: { maxHeight: [maxHeight, "rem"].join("") },
      }}
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
            // row.original["Số đơn hàng"] === "" &&
            true && (
              <Tooltip arrow title="View">
                <IconButton
                  onClick={() => {
                    onCickOneRow();
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
  );
};

const DonHang = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const column_donhang = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_DONHANG);
  }, []);

  const data_donhang = useMemo(() => {
    return renderDataEmpty(INFO_COLS_DONHANG, 10);
  }, []);
  const handleCheckDonHang = () => {
    dispatchTable(actions_table.setTitleModal("Đơn hàng - F0032"));
    dispatchTable(actions_table.setModeShowModal(true));
  };
  return (
    <>
      <Table
        columns={column_donhang}
        data={data_donhang}
        maxHeight={30}
        onCickOneRow={handleCheckDonHang}
      />
      <Modal>
        <FormDonHang />
      </Modal>
    </>
  );
};

export default DonHang;
