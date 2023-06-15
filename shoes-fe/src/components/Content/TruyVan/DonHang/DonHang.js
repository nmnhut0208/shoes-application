import MaterialReactTable from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Delete, Edit } from "@mui/icons-material";

import { useUserContext } from "~user";

import Modal from "./Modal";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import { FormDonHang } from "~nghiep_vu/DonHang/";
import { INFO_COLS_DONHANG } from "./ConstantVariable";

const Table = ({ columns, data, setDataDonHang, permission }) => {
  const [rowInfo, setRowInfo] = useState({});

  const [isSaveData, setIsSaveData] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const handleCheckDonHang = () => {
    setShowModal(true);
  };
  const handleDeleteRow = (row) => {
    let url =
      "http://localhost:8000/donhang?SODH=" + encodeURIComponent(row["SODH"]);
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => console.log("response: ", res))
      .catch((err) => console.log("error: ", err));

    const newData = data.filter((item) => item.SODH != row.SODH);
    setDataDonHang(newData);
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
            {permission.SUA === 1 && (
              <Tooltip arrow title="Edit" placement="right">
                <IconButton
                  onClick={() => {
                    setRowInfo(row.original);
                    handleCheckDonHang();
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            )}
            {permission.XOA === 1 && (
              <Tooltip arrow placement="right" title="Delete">
                <IconButton
                  color="error"
                  onClick={() => {
                    handleDeleteRow(row.original);
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
            {permission.XEM === 1 &&
              permission.THEM === 0 &&
              permission.SUA === 0 && (
                <Tooltip arrow placement="right" title="View Detail">
                  <IconButton
                    onClick={() => {
                      setRowInfo(row.original);
                      handleCheckDonHang();
                    }}
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton>
                </Tooltip>
              )}
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
          permission={permission}
        />
      </Modal>
    </>
  );
};

const MAFORM_TRUYVAN_DONHANG = "F0031";

const DonHang = () => {
  const [dataDonHang, setDataDonHang] = useState([]);
  const column_donhang = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_DONHANG);
  }, []);
  const [stateUser, dispatchUser] = useUserContext();

  const permission = useMemo(() => {
    const phanquyen = stateUser.userPoolAccess.filter(
      (obj) => obj.MAFORM === MAFORM_TRUYVAN_DONHANG
    )[0];
    return phanquyen;
  }, []);

  useEffect(() => {
    if (permission.XEM + permission.SUA + permission.XOA + permission.IN > 0) {
      fetch("http://localhost:8000/donhang/baocao_donhang")
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          setDataDonHang(info);
          console.log("info: ", info);
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    }
  }, []);

  if (permission.XEM + permission.SUA + permission.XOA + permission.IN === 0) {
    alert(stateUser.userName + " không có quyền xem Truy Vấn Đơn Hàng");
    return <></>;
  }
  return (
    <Table
      columns={column_donhang}
      data={dataDonHang}
      setDataDonHang={setDataDonHang}
      permission={permission}
    />
  );
};

export default DonHang;
