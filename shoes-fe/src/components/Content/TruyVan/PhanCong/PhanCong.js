import MaterialReactTable from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { Popconfirm } from "antd";

import { useUserContext } from "~user";

import { processingInfoColumnTable } from "~utils/processing_data_table";
import { FormNghiepVuPhanCong, Modal } from "~nghiep_vu/PhanCong/";
import { INFO_COLS_PHANCONG } from "./ConstantVariable";
import { border_text_table_config } from "~config/ui";
import styles from "./PhanCong.module.scss";
import clsx from "clsx";
import { CustomAlert } from "~utils/alert_custom";

const Table = ({ columns, data, setDataPhanCong, permission }) => {
  console.log("vao table phan cong ne");
  const [rowInfo, setRowInfo] = useState({});
  const [isSaveData, setIsSaveData] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [
    listMaDongPhanCongAddButWaitSave,
    setListMaDongPhanCongAddButWaitSave,
  ] = useState([]);

  const [dataDeleteButWaitSave, setDataDeleteButWaitSave] = useState([]);

  const handleEditRow = () => {
    setListMaDongPhanCongAddButWaitSave([]);
    setDataDeleteButWaitSave([]);
    setShowModal(true);
  };
  const handleDeleteRow = (row) => {
    let url =
      "http://localhost:8000/phancong?SOPHIEU=" +
      encodeURIComponent(row["SOPHIEU"]);
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => console.log("response: ", res))
      .catch((err) => console.log("error: ", err));

    const newData = data.filter((item) => item.SOPHIEU != row.SOPHIEU);
    setDataPhanCong(newData);
  };
  return (
    <>
      <MaterialReactTable
        {...border_text_table_config}
        enableTopToolbar={true} // show tool to filter
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
          sx: { maxHeight: "60rem" },
        }}
        // row number
        enableRowNumbers
        // add action in row
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
                  handleEditRow();
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
                  handleEditRow();
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
        title="Phân Công - F0037"
        setShowModal={setShowModal}
        isResetPageEmpty={false}
        isSaveData={isSaveData}
        listMaDongPhanCongAddButWaitSave={listMaDongPhanCongAddButWaitSave}
        dataDeleteButWaitSave={dataDeleteButWaitSave}
      >
        <FormNghiepVuPhanCong
          dataView={rowInfo}
          isSaveData={isSaveData}
          setIsSaveData={setIsSaveData}
          permission={permission}
          listMaDongPhanCongAddButWaitSave={listMaDongPhanCongAddButWaitSave}
          dataDeleteButWaitSave={dataDeleteButWaitSave}
          setDataDeleteButWaitSave={setDataDeleteButWaitSave}
          setListMaDongPhanCongAddButWaitSave={
            setListMaDongPhanCongAddButWaitSave
          }
          action="edit"
        />
      </Modal>

      {/* 
        Khi hiện FormPhanCong ở chế độ view chỉ hiện thông tin của đơn hàng hiện tại
        thôi 
        Bảng ở trên show 1 dòng đơn hàng
        Bảng ở dưới show thông tin phân công của đơn hàng đó. 
        => ko cho xóa sửa gì hết 
        // Lấy thông tin dòng select truyền qua cho FormPhanCon ne 
        => Qua đó query thông tin phân công 
         */}
    </>
  );
};

const MAFORM_TRUYVAN_PHANCONG = "F0039";

const updateInfo = (permission, year, setData) => {
  if (permission === undefined) return;
  if (permission.XEM + permission.SUA + permission.XOA + permission.IN > 0) {
    let url = "http://localhost:8000/phancong/baocao_phancong";
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

const PhanCong = () => {
  const [dataPhanCong, setDataPhanCong] = useState([]);
  const [year, setYear] = useState("");

  const columns = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_PHANCONG);
  }, []);

  const [stateUser, dispatchUser] = useUserContext();

  const permission = useMemo(() => {
    const phanquyen = stateUser.userPoolAccess.filter(
      (obj) => obj.MAFORM === MAFORM_TRUYVAN_PHANCONG
    )[0];
    return phanquyen;
  }, []);

  useEffect(() => {
    updateInfo(permission, year, setDataPhanCong);
  }, []);

  if (
    permission === undefined ||
    Object.keys(permission).length === 0 ||
    permission.XEM + permission.SUA + permission.XOA + permission.IN === 0
  ) {
    CustomAlert(stateUser.userName + " không có quyền xem Truy Vấn Phân Công");
    return <></>;
  }

  const handleTruyVan = () => {
    if (year === "") return;
    updateInfo(permission, year, setDataPhanCong);
  };

  return (
    <>
      <h1>Phân công</h1>
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
        columns={columns}
        data={dataPhanCong}
        setDataPhanCong={setDataPhanCong}
        permission={permission}
      />
    </>
  );
};

export default PhanCong;
