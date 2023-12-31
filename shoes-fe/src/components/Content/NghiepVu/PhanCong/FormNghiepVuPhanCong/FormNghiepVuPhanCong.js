import clsx from "clsx";
import { useEffect, useState, useMemo } from "react";

import {
  INFO_COLS_DONHANG,
  INFO_COLS_CHITIET_PHANCONG,
} from "./ConstantVariable";
import {
  renderDataEmpty,
  processingInfoColumnTable,
} from "~utils/processing_data_table";

import {
  InfoPhieu,
  PhanCongForm,
  TableDonHang,
  TableChiTietPhanCong,
  XemPhanCong,
  InTongHop,
  In,
} from "../components";
import {
  updateInfoPhieuPhanCong,
  processing_button_add,
  updateMaGiayWillPhanCong,
  processing_button_delete,
  updateSOPHIEU,
} from "./helper";
import { FormDonHang } from "~nghiep_vu/DonHang/";
import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";
import { CustomAlert } from "~utils/alert_custom";
import styles from "./FormNghiepVuPhanCong.module.scss";

const infoTableDonHang = processingInfoColumnTable(INFO_COLS_DONHANG);
const infoTableChiTietPhanCong = processingInfoColumnTable(
  INFO_COLS_CHITIET_PHANCONG
);

const FormNghiepVuPhanCong = ({
  dataView,
  isSaveData,
  setIsSaveData,
  permission,
  listMaDongPhanCongAddButWaitSave,
  setListMaDongPhanCongAddButWaitSave,
  dataDeleteButWaitSave,
  setDataDeleteButWaitSave,
  action = "add",
}) => {
  const view = useMemo(() => {
    if (action != "add" && permission && permission.SUA === 0) return true;
    else return false;
  }, []);

  const [dataDonHang, setDataDonHang] = useState(() =>
    renderDataEmpty(INFO_COLS_DONHANG, 6)
  );
  // lưu những đơn hàng đã phân công xong
  // để sửa lý logic khi người dùng chỉnh sửa phân công

  const [stateTable, dispatchTable] = useTableContext();
  const [infoFormWillShow, setInfoFormWillShow] = useState({
    chitiet_donhang: false,
    xem_phancong: false,
    in_tonghop: false,
    in: false,
  });

  const [infoPhieu, setInfoPhieu] = useState({});
  const [lastestSOPHIEU, setLastestSOPHIEU] = useState(0);
  const [dataChiTietPhanCong, setDataChiTietPhanCong] = useState([]);
  const [rowSelectionDonHangToPhanCong, setRowSelectionDonHangToPhanCong] =
    useState({});
  const [listGiayWillPhanCong, setListGiayWillPhanCong] = useState([]);
  const [formPhanCong, setFormPhanCong] = useState({});

  const [listDonHangDonePhanCong, setListDonHangDonePhanCong] = useState([]);
  const [dataDonHangDaPhanCong, setDataDonHangDaPhanCong] = useState([]);

  const [rowSelectionChiTietPhanCong, setRowSelectionChiTietPhanCong] =
    useState({});

  const resetForm = () => {
    let form_current = formPhanCong;
    for (let key in form_current) {
      if (!["THODE", "THOQUAI"].includes(key)) {
        form_current[key] = "";
      }
    }
    setFormPhanCong(form_current);
  };

  useEffect(() => {
    updateMaGiayWillPhanCong(
      dataDonHang,
      rowSelectionDonHangToPhanCong,
      setListGiayWillPhanCong,
      formPhanCong,
      setFormPhanCong
    );
  }, [rowSelectionDonHangToPhanCong, dataDonHang]);

  useEffect(() => {
    // case 1: Nghiệp Vụ Phân Công
    if (!dataView) {
      updateInfoPhieuPhanCong(infoPhieu, setInfoPhieu, setLastestSOPHIEU);
      fetch("http://localhost:8000/phancong/donhangchuaphancong")
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          setDataDonHang(info);
          if (info.length > 0)
            setRowSelectionDonHangToPhanCong({
              0: true,
            });
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    }

    // case 2: Truy Vấn Phân Công
    if (dataView) {
      // set Form Header
      setInfoPhieu(dataView);
      // query info to show for 2 table
      // chỉnh lại API, query database để lấy những đơn hàng được
      // phân công cho Số phiếu đang muốn xem

      fetch("http://localhost:8000/phancong/donhangchuaphancong")
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          setDataDonHang(info);
          if (info.length > 0) {
            setRowSelectionDonHangToPhanCong({
              0: true,
            });
            // update setDataDonHangDaPhanCong
            fetch(
              "http://localhost:8000/phancong/get_info_donhang?SOPHIEU=" +
                encodeURIComponent(dataView["SOPHIEU"])
            )
              .then((response) => {
                return response.json();
              })
              .then((result) => {
                const list_DH_chua_PC = info.map((obj, i) => obj.SODH);
                result = result.filter(
                  (obj) => !list_DH_chua_PC.includes(obj.SODH)
                );
                console.log(result);
                setListDonHangDonePhanCong(result.map((obj, i) => obj.SODH));
                setDataDonHangDaPhanCong(result);
              })
              .catch((err) => {
                console.log(":error: ", err);
              });
          }
        })
        .catch((err) => {
          console.log(":error: ", err);
        });

      // update dataChiTietPhanCong
      fetch(
        "http://localhost:8000/phancong?SOPHIEU=" +
          encodeURIComponent(dataView["SOPHIEU"])
      )
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          console.log("setDataChiTietPhanCong: ", info);
          setDataChiTietPhanCong(info);
        })
        .catch((err) => {
          console.log(":error: ", err);
        });

      setIsSaveData(true);

      // query thông tin show bảng thứ 2
    }
  }, []);

  const handleClickAdd = () => {
    processing_button_add(
      infoPhieu,
      formPhanCong,
      setFormPhanCong,
      resetForm,
      listGiayWillPhanCong,
      setListGiayWillPhanCong,
      dataDonHang,
      setDataDonHang,
      dataDonHangDaPhanCong,
      setDataDonHangDaPhanCong,
      dataChiTietPhanCong,
      setDataChiTietPhanCong,
      listDonHangDonePhanCong,
      setListDonHangDonePhanCong,
      rowSelectionDonHangToPhanCong,
      setRowSelectionDonHangToPhanCong,
      listMaDongPhanCongAddButWaitSave,
      setListMaDongPhanCongAddButWaitSave,
      dataView,
      lastestSOPHIEU
    );
    setIsSaveData(false);
  };
  const handleClickDelete = () => {
    processing_button_delete(
      dataDonHang,
      setDataDonHang,
      rowSelectionDonHangToPhanCong,
      setRowSelectionDonHangToPhanCong,
      dataChiTietPhanCong,
      setDataChiTietPhanCong,
      rowSelectionChiTietPhanCong,
      dataDonHangDaPhanCong,
      setDataDonHangDaPhanCong,
      listDonHangDonePhanCong,
      setListDonHangDonePhanCong,
      setListGiayWillPhanCong,
      formPhanCong,
      setFormPhanCong,
      infoPhieu,
      resetForm,
      listMaDongPhanCongAddButWaitSave,
      setListMaDongPhanCongAddButWaitSave,
      dataDeleteButWaitSave,
      setDataDeleteButWaitSave
    );
    setIsSaveData(false);
  };

  const handleClickSave = () => {
    if (isSaveData) return;
    // chỉ update thông tin header (infoPhieu) thôi
    fetch("http://localhost:8000/phancong/update_header", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infoPhieu),
    })
      .then((response) => {
        console.log("response: ", response);
        CustomAlert("Lưu thành công!");
      })
      .catch((error) => {
        console.log("error: ", error);
        // CustomAlert("Lỗi! Chưa lưu được!");
      });

    if (!dataView) updateSOPHIEU(lastestSOPHIEU);
    setListMaDongPhanCongAddButWaitSave([]);
    setDataDeleteButWaitSave([]);
    setIsSaveData(true);
  };

  const handleClickChiTietDonHang = () => {
    if (
      dataChiTietPhanCong.length == 0 ||
      Object.keys(rowSelectionChiTietPhanCong).length == 0 ||
      parseInt(Object.keys(rowSelectionChiTietPhanCong)[0]) >=
        dataChiTietPhanCong.length
    ) {
      return false;
    }
    // show page DonHang with mode view
    setInfoFormWillShow({
      chitiet_donhang: true,
      xem_phancong: false,
      in_tonghop: false,
      in: false,
    });
    dispatchTable(actions_table.setTitleModal("Đơn hàng - F0032"));
    dispatchTable(actions_table.setModeShowModal(true));
  };

  const handleClickXemPhanCong = () => {
    if (dataChiTietPhanCong.length == 0) {
      return false;
    }
    // show page DonHang with mode view
    setInfoFormWillShow({
      chitiet_donhang: false,
      xem_phancong: true,
      in_tonghop: false,
      in: false,
    });
    dispatchTable(actions_table.setTitleModal("Xem phân công - F0038"));
    dispatchTable(actions_table.setModeShowModal(true));
  };

  const handle_in_tonghop = () => {
    setInfoFormWillShow({
      chitiet_donhang: false,
      xem_phancong: false,
      in_tonghop: true,
      in: false,
    });
    dispatchTable(actions_table.setTitleModal("In tổng hợp"));
    dispatchTable(actions_table.setModeShowModal(true));
  };

  const handle_in = () => {
    setInfoFormWillShow({
      chitiet_donhang: false,
      xem_phancong: false,
      in_tonghop: false,
      in: true,
    });
    dispatchTable(actions_table.setTitleModal("In phân công theo nhân viên"));
    dispatchTable(actions_table.setModeShowModal(true));
  };

  useEffect(() => {
    if (dataChiTietPhanCong.length > 0) {
      setIsSaveData(false);
    }
  }, [infoPhieu]);

  const handleNhapTiep = () => {
    if (!isSaveData) {
      CustomAlert("Lưu thông tin trước khi reset page!");
      return;
    }
    updateInfoPhieuPhanCong(infoPhieu, setInfoPhieu, setLastestSOPHIEU);
    fetch("http://localhost:8000/phancong/donhangchuaphancong")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataDonHang(info);
        if (info.length > 0)
          setRowSelectionDonHangToPhanCong({
            0: true,
          });
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
    setDataChiTietPhanCong([]);
    setListGiayWillPhanCong([]);
    setFormPhanCong([]);
    setListDonHangDonePhanCong([]);
    setDataDonHangDaPhanCong([]);
    setRowSelectionChiTietPhanCong([]);
    resetForm();

    setIsSaveData(true);
  };

  return (
    <div className={styles.container}>
      <InfoPhieu
        infoPhieu={infoPhieu}
        setInfoPhieu={setInfoPhieu}
        view={view}
      />
      <div style={{ width: "80vw" }}>
        <TableDonHang
          columns={infoTableDonHang}
          data={dataDonHang}
          maxHeight={20}
          rowSelection={rowSelectionDonHangToPhanCong}
          setRowSelection={setRowSelectionDonHangToPhanCong}
        />
      </div>

      {!view && (
        <PhanCongForm
          form={formPhanCong}
          setChiTietPhanCong={setFormPhanCong}
          listGiayWillPhanCong={listGiayWillPhanCong}
        />
      )}

      {/* group button */}

      <div className={styles.button_group_end_page}>
        {!view && (
          <div className={styles.button_left}>
            <div>
              <button onClick={handleClickAdd}>Thêm</button>
              <button onClick={handleClickDelete}>Xóa</button>
            </div>
          </div>
        )}

        <div className={styles.button_right}>
          <button
            onClick={handleClickSave}
            disabled={view}
            className={styles.button_save}
          >
            Lưu
          </button>
          <button onClick={handleClickChiTietDonHang}>Chi tiết đơn hàng</button>
          <button onClick={handle_in_tonghop} disabled={!isSaveData}>
            In tổng hợp
          </button>
          <button onClick={handle_in} disabled={!isSaveData}>
            In
          </button>
          <button onClick={handleClickXemPhanCong}>Xem phân công</button>

          {action === "add" && (
            <button
              onClick={handleNhapTiep}
              disabled={permission.THEM === 0 || !isSaveData}
            >
              Nhập tiếp
            </button>
          )}
        </div>
      </div>
      <div style={{ width: "80vw" }}>
        <TableChiTietPhanCong
          columns={infoTableChiTietPhanCong}
          data={dataChiTietPhanCong}
          maxHeight={30}
          rowSelection={rowSelectionChiTietPhanCong}
          setRowSelection={setRowSelectionChiTietPhanCong}
        />
      </div>

      {infoFormWillShow["chitiet_donhang"] && (
        <Modal>
          <FormDonHang
            dataView={
              dataChiTietPhanCong[
                parseInt(Object.keys(rowSelectionChiTietPhanCong)[0])
              ]
            }
            isSaveData={true}
            setIsSaveData={() => {
              return 1;
            }} // fake function => không cần thay đổi gì cả
            permission={{
              MAFORM: "F0032",
              TENFORM: "Đơn hàng",
              THEM: 0,
              SUA: 0,
              XOA: 0,
              XEM: 1,
              IN: 1,
            }}
          />
        </Modal>
      )}

      {infoFormWillShow["xem_phancong"] && (
        <Modal>
          <XemPhanCong
            SOPHIEU={infoPhieu["SOPHIEU"]}
            dataPhanCong={dataChiTietPhanCong}
          />
        </Modal>
      )}

      {infoFormWillShow["in_tonghop"] && (
        <Modal>
          <InTongHop
            sophieu={infoPhieu["SOPHIEU"]}
            data={dataChiTietPhanCong}
          />
        </Modal>
      )}

      {infoFormWillShow["in"] && (
        <Modal>
          <In sophieu={infoPhieu["SOPHIEU"]} data={dataChiTietPhanCong} />
        </Modal>
      )}
    </div>
  );
};

export default FormNghiepVuPhanCong;
