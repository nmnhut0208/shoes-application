import MaterialReactTable from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Delete, Edit } from "@mui/icons-material";

import { useUserContext } from "~user";

import { processingInfoColumnTable } from "~utils/processing_data_table";
import { border_text_table_config } from "~config/ui";

import { FormDonHang, Modal } from "~nghiep_vu/DonHang/";
import { INFO_COLS_DONHANG } from "./ConstantVariable";
import styles from "./DonHang.module.scss";
import clsx from "clsx";

const Table = ({ columns, data, setDataDonHang, permission }) => {
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
    setDataDonHang(newData);
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
        title="Đơn hàng - F0032"
        setShowModal={setShowModal}
        isSaveData={isSaveData}
        isResetPageEmpty={false}
      >
        <FormDonHang
          dataView={rowInfo}
          setShowModalNghiepVuDonHang={setShowModal}
          isSaveData={isSaveData}
          setIsSaveData={setIsSaveData}
          permission={permission}
          action='edit'
        />
      </Modal>
    </>
  );
};

const MAFORM_TRUYVAN_DONHANG = "F0031";

const updateInfo = (permission, year, setDataDonHang) => {
  if (permission === undefined) return;
  if (permission.XEM + permission.SUA + permission.XOA + permission.IN > 0) {
    let url = "http://localhost:8000/donhang/baocao_donhang";
    if (year != "" && year > 2020) {
      url += "?YEAR=" + year;
    }
    fetch(url)
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
};

const DonHang = () => {
  const [dataDonHang, setDataDonHang] = useState([]);
  const column_donhang = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_DONHANG);
  }, []);
  const [year, setYear] = useState("");
  const [stateUser, dispatchUser] = useUserContext();

  const permission = useMemo(() => {
    const phanquyen = stateUser.userPoolAccess.filter(
      (obj) => obj.MAFORM === MAFORM_TRUYVAN_DONHANG
    )[0];
    return phanquyen;
  }, []);

  useEffect(() => {
    updateInfo(permission, year, setDataDonHang);
  }, []);

  if (
    permission === undefined ||
    Object.keys(permission).length === 0 ||
    permission.XEM + permission.SUA + permission.XOA + permission.IN === 0
  ) {
    alert(stateUser.userName + " không có quyền xem Truy Vấn Đơn Hàng");
    return <></>;
  }
  const handleTruyVan = () => {
    if (year === "") return;
    updateInfo(permission, year, setDataDonHang);
  };
  return (
    <>
      <div className={clsx(styles.form, styles.info_query)}>
        <label>Xem dữ liệu năm</label>
        <input
          type="number"
          min="2020"
          step="1"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
        />
        <button onClick={handleTruyVan}>Truy Vấn</button>
      </div>
      <Table
        columns={column_donhang}
        data={dataDonHang}
        setDataDonHang={setDataDonHang}
        permission={permission}
      />
    </>
  );
};

export default DonHang;
