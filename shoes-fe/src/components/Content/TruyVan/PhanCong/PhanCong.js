import MaterialReactTable from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";

import { processingInfoColumnTable } from "~utils/processing_data_table";
import { default as FormPhanCong } from "~nghiep_vu/PhanCong/";
import { INFO_COLS_PHANCONG } from "./ConstantVariable";

const Table = ({ columns, data }) => {
  const [stateTable, dispatchTable] = useTableContext();
  const [rowInfo, setRowInfo] = useState({});
  const handleCheckDonHang = () => {
    dispatchTable(actions_table.setTitleModal("Phân công - F0037"));
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
              // row.original["Số đơn hàng"] === "" &&
              true && (
                <Tooltip arrow title="View">
                  <IconButton
                    onClick={() => {
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
        <FormPhanCong dataView={rowInfo} view={true} />
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

const PhanCong = () => {
  const [dataPhanCong, setDataPhanCong] = useState([]);

  const columns = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_PHANCONG);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/items_phancong_truy_van")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataPhanCong(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  return (
    <>
      <h1>Phân công - F0039</h1>
      <Table columns={columns} data={dataPhanCong} />
    </>
  );
};

export default PhanCong;
