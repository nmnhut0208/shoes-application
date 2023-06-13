import MaterialReactTable from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";

import Modal from "./Modal";
import { useTableContext, actions_table } from "~table_context";

import { processingInfoColumnTable } from "~utils/processing_data_table";
import { FormDonHang } from "~nghiep_vu/DonHang/";
import { INFO_COLS_DONHANG } from "./ConstantVariable";

const Table = ({ columns, data }) => {
  // const [stateTable, dispatchTable] = useTableContext();
  const [rowInfo, setRowInfo] = useState({});

  const [isSaveData, setIsSaveData] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const handleCheckDonHang = () => {
    setShowModal(true);
  };
  return (
    <>
      <MaterialReactTable
        // enableTopToolbar={false}
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
          sx: { maxHeight: "65rem" },
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

      <Modal
        status={showModal}
        title="Đơn hàng - F0032"
        setShowModal={setShowModal}
        isSaveData={isSaveData}
      >
        <FormDonHang
          dataView={rowInfo}
          setShowModalNghiepVuDonHang={setShowModal}
          setIsSaveDataNghiepVuDonHang={setIsSaveData}
        />
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
    fetch("http://localhost:8000/donhang/baocao_donhang")
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
