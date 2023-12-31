import MaterialReactTable from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { Popconfirm } from "antd";
import { useUserContext } from "~user";

import { processingInfoColumnTable } from "~utils/processing_data_table";
import { border_text_table_config } from "~config/ui";

import { FormDonHang, Modal } from "~nghiep_vu/DonHang/";
import { INFO_COLS_DONHANG } from "./ConstantVariable";
import styles from "./DonHang.module.scss";
import clsx from "clsx";
import { CustomAlert } from "~utils/alert_custom";

const Table = ({ columns, data, setDataDonHang, permission }) => {
  console.log("permission: ", permission);
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
        {...border_text_table_config}
        enableTopToolbar={true}
        initialState={{ showColumnFilters: true }}
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
        displayColumnDefOptions={{
          "mrt-row-actions": {
            minSize: 110, //set custom width
            muiTableHeadCellProps: {
              align: "center", //change head cell props
            },
            muiTableBodyCellProps: {
              minSize: 110,
            },
            enableResizing: true,
          },
        }}
        enableRowActions={true}
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
                  setRowInfo(row.original);
                  handleCheckDonHang();
                }}
              >
                Sửa
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
          action="edit"
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
    CustomAlert(stateUser.userName + " không có quyền xem Truy Vấn Đơn Hàng");
    return <></>;
  }
  const handleTruyVan = () => {
    if (year === "") return;
    updateInfo(permission, year, setDataDonHang);
  };
  return (
    <div style={{ width: "88%", marginLeft: "5%" }}>
      <h1 className={styles.header_table}>Truy vấn - Đơn hàng</h1>
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
    </div>
  );
};

export default DonHang;
