import MaterialReactTable from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Delete, Edit } from "@mui/icons-material";

import { useUserContext } from "~user";

import { processingInfoColumnTable } from "~utils/processing_data_table";
import { border_text_table_config } from "~config/ui";

import { FormThuTien } from "~nghiep_vu/ThuTien/";
import { INFO_COLS_DONHANG } from "./ConstantVariable";

const Table = ({ columns, data, setData, permission }) => {
  const [rowInfo, setRowInfo] = useState({});

  const [isSaveData, setIsSaveData] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const handleCheckDonHang = () => {
    setShowModal(true);
  };
  const handleDeleteRow = (row) => {
    let text = "Bạn thực sự muốn xóa thông tin này không!";
    if (!window.confirm(text)) {
      return;
    }
    let url =
      "http://localhost:8000/donhang?SODH=" + encodeURIComponent(row["SODH"]);
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => console.log("response: ", res))
      .catch((err) => console.log("error: ", err));

    const newData = data.filter((item) => item.SODH != row.SODH);
    setData(newData);
  };
  return (
    <>
      <MaterialReactTable
        {...border_text_table_config}
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
        title="Phiếu Thu - F0036"
        setShowModal={setShowModal}
        isResetPageEmpty={false}
      >
        <FormThuTien dataView={rowInfo} type_action="edit" />
      </Modal>
    </>
  );
};

const MAFORM_TRUYVAN_PHIEUTHU = "F0035";

const DonHang = () => {
  const [data, setData] = useState([]);
  const column_donhang = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_DONHANG);
  }, []);
  const [stateUser, dispatchUser] = useUserContext();

  const permission = useMemo(() => {
    const phanquyen = stateUser.userPoolAccess.filter(
      (obj) => obj.MAFORM === MAFORM_TRUYVAN_PHIEUTHU
    )[0];
    return phanquyen;
  }, []);

  useEffect(() => {
    if (permission.XEM + permission.SUA + permission.XOA + permission.IN > 0) {
      fetch("http://localhost:8000/congno/truyvan_thu")
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          setData(info);
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
      data={data}
      setData={setData}
      permission={permission}
    />
  );
};

export default DonHang;
