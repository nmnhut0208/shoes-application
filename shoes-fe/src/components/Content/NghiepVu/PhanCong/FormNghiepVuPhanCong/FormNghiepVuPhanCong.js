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

import styles from "./FormNghiepVuPhanCong.module.scss";

const infoTableDonHang = processingInfoColumnTable(INFO_COLS_DONHANG);
const infoTableChiTietPhanCong = processingInfoColumnTable(
  INFO_COLS_CHITIET_PHANCONG
);

const FormNghiepVuPhanCong = ({
  dataView,
  setIsSaveDataNghiepVuPhanCong,
  permission,
  listMaDongPhanCongAddButWaitSave,
  setListMaDongPhanCongAddButWaitSave,
  dataDeleteButWaitSave,
  setDataDeleteButWaitSave,
}) => {
  const view = useMemo(() => {
    if (permission && permission.THEM === 0 && permission.SUA === 0)
      return true;
    else return false;
  }, []);

  console.log(
    "listMaDongPhanCongAddButWaitSave: ",
    listMaDongPhanCongAddButWaitSave
  );

  const [dataDonHang, setDataDonHang] = useState(() =>
    renderDataEmpty(INFO_COLS_DONHANG, 6)
  );
  const [havedSaveData, setHavedSaveData] = useState(false);
  // lưu những đơn hàng đã phân công xong
  // để sửa lý logic khi người dùng chỉnh sửa phân công

  const [stateTable, dispatchTable] = useTableContext();
  const [infoFormWillShow, setInfoFormWillShow] = useState({
    chitiet_donhang: false,
    xem_phancong: false,
    in_tonghop: false,
  });

  const [infoPhieu, setInfoPhieu] = useState({});
  console.log("infoPhieu: ", infoPhieu);
  const [lastestSOPHIEU, setLastestSOPHIEU] = useState(0);
  const [dataChiTietPhanCong, setDataChiTietPhanCong] = useState([]);
  const [rowSelectionDonHangToPhanCong, setRowSelectionDonHangToPhanCong] =
    useState({});
  const [listGiayWillPhanCong, setListGiayWillPhanCong] = useState([]);
  const [formPhanCong, setFormPhanCong] = useState({});

  const [listDonHangDonePhanCong, setListDonHangDonePhanCong] = useState([]);
  const [dataDonHangDaPhanCong, setDataDonHangDaPhanCong] = useState([]);

  console.log("listDonHangDonePhanCong: ", listDonHangDonePhanCong);
  console.log("dataDonHangDaPhanCong: ", dataDonHangDaPhanCong);
  console.log("dataChiTietPhanCong:", dataChiTietPhanCong);

  const [rowSelectionChiTietPhanCong, setRowSelectionChiTietPhanCong] =
    useState({});

  const resetForm = () => {
    let form_current = formPhanCong;
    for (let key in form_current) {
      form_current[key] = "";
    }
    setFormPhanCong(form_current);
    setHavedSaveData(true);
    setIsSaveDataNghiepVuPhanCong(true);
  };

  useEffect(() => {
    updateMaGiayWillPhanCong(
      dataDonHang,
      rowSelectionDonHangToPhanCong,
      dataChiTietPhanCong,
      setListGiayWillPhanCong,
      setFormPhanCong,
      resetForm
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
      console.log(":dataView: ", dataView);
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
                console.log("VO CAI CUOI CUNG");
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
          setDataChiTietPhanCong(info);
        })
        .catch((err) => {
          console.log(":error: ", err);
        });

      // query thông tin show bảng thứ 2
    }

    // case 3: người dùng query lại thông tin cũ
    // giờ thì mình thấy cho edit từ truy vấn cũng tiện
    // đỡ phải nhập mã phân công, rồi query
    // => ko biết web hiện tại trường hợp này nó làm gì ta??
    // khi ng dùng nhập mã phân công, mã đơn hàng á
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
      setListMaDongPhanCongAddButWaitSave
    );
    setHavedSaveData(false);
    setIsSaveDataNghiepVuPhanCong(false);
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
      setFormPhanCong,
      infoPhieu,
      resetForm,
      listMaDongPhanCongAddButWaitSave,
      setListMaDongPhanCongAddButWaitSave,
      dataDeleteButWaitSave,
      setDataDeleteButWaitSave
    );
    setHavedSaveData(false);
    setIsSaveDataNghiepVuPhanCong(false);
  };
  const handleClickSave = () => {
    if (havedSaveData) return;
    let dataSave = dataChiTietPhanCong;
    for (let i = 0; i < dataSave.length; i++) {
      dataSave[i] = { ...dataSave[i], ...infoPhieu };
    }
    console.log("JSON.stringify(dataSave): ", JSON.stringify(dataSave));
    fetch("http://localhost:8000/phancong", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataSave),
    })
      .then((response) => {
        console.log("response: ", response);
        alert("Lưu thành công!");
      })
      .catch((error) => {
        console.log("error: ", error);
        alert("Lỗi! Chưa lưu được!");
      });

    if (!dataView) updateSOPHIEU(lastestSOPHIEU);
    setListMaDongPhanCongAddButWaitSave([]);
    setDataDeleteButWaitSave([]);
    setHavedSaveData(true);
    setIsSaveDataNghiepVuPhanCong(true);
  };

  const handleClickChiTietDonHang = () => {
    if (
      dataChiTietPhanCong.length == 0 ||
      Object.keys(rowSelectionChiTietPhanCong).length == 0
    ) {
      return false;
    }
    // show page DonHang with mode view
    setInfoFormWillShow({
      chitiet_donhang: true,
      xem_phancong: false,
      in_tonghop: false,
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
    });
    dispatchTable(actions_table.setTitleModal("Xem phân công - F0038"));
    dispatchTable(actions_table.setModeShowModal(true));
  };

  const handle_in_tonghop = () => {
    setInfoFormWillShow({
      chitiet_donhang: false,
      xem_phancong: false,
      in_tonghop: true,
    });
    dispatchTable(actions_table.setTitleModal("In tổng hợp"));
    dispatchTable(actions_table.setModeShowModal(true));
  };

  return (
    <div className={styles.container}>
      <InfoPhieu
        infoPhieu={infoPhieu}
        setInfoPhieu={setInfoPhieu}
        setHavedSaveData={setHavedSaveData}
        setIsSaveDataNghiepVuPhanCong={setIsSaveDataNghiepVuPhanCong}
      />
      <TableDonHang
        columns={infoTableDonHang}
        data={dataDonHang}
        maxHeight={18}
        rowSelection={rowSelectionDonHangToPhanCong}
        setRowSelection={setRowSelectionDonHangToPhanCong}
      />

      {!view && (
        <PhanCongForm
          form={formPhanCong}
          setChiTietPhanCong={setFormPhanCong}
          listGiayWillPhanCong={listGiayWillPhanCong}
        />
      )}

      {!view && (
        <div className={clsx(styles.button_group, styles.form)}>
          <button onClick={handleClickAdd}>Thêm</button>
          <button onClick={handleClickDelete}>Xóa</button>
          <button onClick={handleClickDelete}>Sửa</button>
        </div>
      )}

      <TableChiTietPhanCong
        columns={infoTableChiTietPhanCong}
        data={dataChiTietPhanCong}
        maxHeight={35}
        rowSelection={rowSelectionChiTietPhanCong}
        setRowSelection={setRowSelectionChiTietPhanCong}
      />

      <div className={styles.button_group_end_page}>
        <div className={styles.left}>
          <button onClick={handleClickChiTietDonHang}>Chi tiết đơn hàng</button>
          <button onClick={handle_in_tonghop}>In tổng hợp</button>
        </div>

        <div className={styles.right}>
          <button>In</button>
          <button onClick={handleClickXemPhanCong}>Xem phân công</button>
          <button onClick={handleClickSave}>Lưu</button>
          {/* button Lưu để lưu thông tin đã phân công */}
          {/* sau khi phân công xong sẽ lưu hết nguyên bảng chi tiết phân công lại */}
        </div>
      </div>

      {infoFormWillShow["chitiet_donhang"] && (
        <Modal>
          <FormDonHang
            dataView={
              dataChiTietPhanCong[
                parseInt(Object.keys(rowSelectionChiTietPhanCong)[0])
              ]
            }
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
    </div>
  );
};

export default FormNghiepVuPhanCong;
