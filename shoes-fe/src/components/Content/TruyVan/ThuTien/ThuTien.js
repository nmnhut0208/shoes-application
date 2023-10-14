import MaterialReactTable from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Delete, Edit } from "@mui/icons-material";
import { Popconfirm } from "antd";

import { useUserContext } from "~user";
import { CustomAlert } from "~utils/alert_custom";
import { processingInfoColumnTable } from "~utils/processing_data_table";

import { FormThuTien, ModalMain } from "~nghiep_vu/ThuTien/";
import { COLUMNS } from "./ConstantVariable";
import { border_text_table_config } from "~config/ui";

import styles from "./ThuTien.module.scss";
import clsx from "clsx";

const Table = ({ columns, data, setData, permission }) => {
  const [typeAction, setTypeAction] = useState("");
  const [rowInfo, setRowInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const handleCheckDonHang = () => {
    setShowModal(true);
  };
  const handleDeleteRow = (row) => {
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
        initialState={{ showColumnFilters: true }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              columnGap: "0.3rem",
              marginLeft: "0.2rem",
              marginRight: "0.2rem",
            }}
          >
            {permission.SUA === 1 && (
              <button
                className={styles.edit_button}
                style={{ borderRight: "0.17rem solid rgba(0, 0, 0, 0.4)" }}
                onClick={() => {
                  setTypeAction("edit");
                  setRowInfo(row.original);
                  handleCheckDonHang();
                }}
              >
                <Edit />
              </button>
            )}
            {permission.XOA === 1 && (
              <Popconfirm
                title="Xác nhận hành động"
                description="Bạn thực sự muốn xoá thông tin này?"
                onConfirm={() => handleDeleteRow(row.original)}
                onCancel={() => {}}
                okText="Đồng ý"
                cancelText="Không đồng ý"
              >
                <button className={styles.delete_button}>Xoá</button>
              </Popconfirm>
            )}
            {permission.XEM === 1 && permission.SUA === 0 && (
              <button
                className={styles.view_button}
                onClick={() => {
                  setTypeAction("view");
                  setRowInfo(row.original);
                  handleCheckDonHang();
                }}
              >
                Xem
              </button>
            )}
          </div>
        )}
      />

      <ModalMain
        status={showModal}
        title="Phiếu Thu - F0036"
        setShowModal={setShowModal}
        isResetPageEmpty={false}
      >
        <FormThuTien dataView={rowInfo} type_action={typeAction} />
      </ModalMain>
    </>
  );
};

const MAFORM_TRUYVAN_PHIEUTHU = "F0035";

const updateInfo = (permission, year, setData) => {
  if (permission === undefined) return;
  if (permission.XEM + permission.SUA + permission.XOA + permission.IN > 0) {
    let url = "http://localhost:8000/congno/truyvan_thu";
    if (year != "" && year > 2020) {
      url += "?YEAR=" + year;
    }
    fetch(url)
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
};

const ThuTien = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState("");
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
    updateInfo(permission, year, setData);
  }, []);

  if (
    permission === undefined ||
    Object.keys(permission).length === 0 ||
    permission.XEM + permission.SUA + permission.XOA + permission.IN === 0
  ) {
    CustomAlert(stateUser.userName + " không có quyền xem Truy Vấn Phiếu Thu");
    return <></>;
  }
  const handleTruyVan = () => {
    if (year === "") return;
    updateInfo(permission, year, setData);
  };
  return (
    <>
      <h1>Thu Tiền</h1>
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
        columns={column}
        data={data}
        setData={setData}
        permission={permission}
      />
    </>
  );
};

export default ThuTien;
