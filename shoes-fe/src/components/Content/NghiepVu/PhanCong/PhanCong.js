import clsx from "clsx";
import { useEffect, useState } from "react";

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
} from "./components";
import {
  updateInfoPhieuPhanCong,
  processing_button_add,
  updateMaGiayWillPhanCong,
  processing_button_delete,
  updateSOPHIEU,
} from "./helper";
import DonHang from "../DonHang/";
import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";

import styles from "./PhanCong.module.scss";

const infoTableDonHang = processingInfoColumnTable(INFO_COLS_DONHANG);
const infoTableChiTietPhanCong = processingInfoColumnTable(
  INFO_COLS_CHITIET_PHANCONG
);

const PhanCong = ({ dataView, view }) => {
  // Phan Cong
  // TODO: delete button
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
    setHavedSaveData(false);
  };

  useEffect(() => {
    console.log("useEffect run again to get ds giay khach hang");
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
    if (!view) {
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
    if (view) {
      // set Form Header
      setInfoPhieu(dataView);
      // query info to show for 2 table
      // chỉnh lại API, query database để lấy những đơn hàng được
      // phân công cho Số phiếu đang muốn xem

      fetch("http://localhost:8000/items_donhang_page_phan_cong_by_so_phieu")
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
      setRowSelectionDonHangToPhanCong
    );
    setHavedSaveData(false);
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
      resetForm
    );
    setHavedSaveData(false);
  };
  const handleClickSave = () => {
    console.log("havedSaveData: ", havedSaveData);
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
      })
      .catch((error) => {
        console.log("error: ", error);
      });

    updateSOPHIEU(lastestSOPHIEU);
    setHavedSaveData(true);
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
    if (
      dataChiTietPhanCong.length == 0 ||
      Object.keys(rowSelectionChiTietPhanCong).length == 0
    ) {
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
      <h2>Phân công - F0037</h2>
      <InfoPhieu
        infoPhieu={infoPhieu}
        setInfoPhieu={setInfoPhieu}
        setHavedSaveData={setHavedSaveData}
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
          <DonHang
            dataView={
              dataChiTietPhanCong[
                parseInt(Object.keys(rowSelectionChiTietPhanCong)[0])
              ]
            }
            view={true}
          />
        </Modal>
      )}

      {infoFormWillShow["xem_phancong"] && (
        <Modal>
          <XemPhanCong
            dataView={
              dataChiTietPhanCong[Object.keys(rowSelectionChiTietPhanCong)[0]]
            }
            view={true}
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

export default PhanCong;
