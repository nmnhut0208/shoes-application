import MaterialReactTable from "material-react-table";
import { useMemo, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";

import {
  renderDataEmpty,
  processingInfoColumnTable,
} from "~utils/processing_data_table";
import { default as FormPhanCong } from "~nghiep_vu/PhanCong/";
import { INFO_COLS_PHANCONG } from "./ConstantVariable";

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

const PhanCong = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const column_donhang = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_PHANCONG);
  }, []);

  const data_donhang = useMemo(() => {
    return renderDataEmpty(INFO_COLS_PHANCONG, 10);
  }, []);
  const handleCheckDonHang = () => {
    dispatchTable(actions_table.setTitleModal("Phân công - F0037"));
    dispatchTable(actions_table.setModeShowModal(true));
  };
  return (
    <>
      <h1>Phân công - F0039</h1>
      <Table
        columns={column_donhang}
        data={data_donhang}
        maxHeight={30}
        onCickOneRow={handleCheckDonHang}
      />
      <Modal>
        <FormPhanCong view={true} />
        {/* 
        Khi hiện FormPhanCong ở chế độ view chỉ hiện thông tin của đơn hàng hiện tại
        thôi 
        Bảng ở trên show 1 dòng đơn hàng
        Bảng ở dưới show thông tin phân công của đơn hàng đó. 
        => ko cho xóa sửa gì hết 
        // Lấy thông tin dòng select truyền qua cho FormPhanCon ne 
        => Qua đó query thông tin phân công 
         */}
      </Modal>
    </>
  );
};

export default PhanCong;
