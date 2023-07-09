import MaterialReactTable from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Delete, Edit } from "@mui/icons-material";

import { useUserContext } from "~user";

import { processingInfoColumnTable } from "~utils/processing_data_table";

import { FormThuTien, ModalMain } from "~nghiep_vu/ThuTien/";
import { COLUMNS } from "./ConstantVariable";
import { border_text_table_config } from "~config/ui";

const Table = ({ columns, data, setData, permission }) => {
  const [rowInfo, setRowInfo] = useState({});
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
      "http://localhost:8000/congno/phieuthu?SOPHIEU=" +
      encodeURIComponent(row["SOPHIEU"]);
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => console.log("response: ", res))
      .catch((err) => console.log("error: ", err));

    const newData = data.filter((item) => item.SOPHIEU != row.SOPHIEU);
    setData(newData);
  };
  return (
    <>
      <MaterialReactTable
        {...border_text_table_config}
        muiTableProps={{
          sx: {
            tableLayout: "fixed",
          },
        }}
        enableTopToolbar={true}
        columns={columns}
        data={data}
        // components
        enableColumnActions={true}
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
        //
        displayColumnDefOptions={{
          "mrt-row-actions": {
            size: 40, //set custom width
            minSize: 24,
            muiTableHeadCellProps: {
              align: "center", //change head cell props
            },
            enableResizing: true,
          },
          "mrt-row-numbers": {
            size: 30,
            minSize: 12,
            enableColumnOrdering: true, //turn on some features that are usually off
            enableResizing: true,
            muiTableHeadCellProps: {
              align: "right",
            },
            muiTableBodyCellProps: {
              align: "right",
            },
          },
        }}
        //
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

      <ModalMain
        status={showModal}
        title="Phiếu Thu - F0036"
        setShowModal={setShowModal}
        isResetPageEmpty={false}
      >
        <FormThuTien dataView={rowInfo} type_action="edit" />
      </ModalMain>
    </>
  );
};

const MAFORM_TRUYVAN_PHIEUTHU = "F0035";

const ThuTien = () => {
  const [data, setData] = useState([]);
  const column = useMemo(() => {
    return processingInfoColumnTable(COLUMNS);
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
    alert(stateUser.userName + " không có quyền xem Truy Vấn Phiếu Thu");
    return <></>;
  }
  return (
    <Table
      columns={column}
      data={data}
      setData={setData}
      permission={permission}
    />
  );
};

export default ThuTien;
