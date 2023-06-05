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
import { updateInfoPhieuPhanCong } from "./helper";
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
  };

  useEffect(() => {
    console.log("useEffect run again to get ds giay khach hang");
    if (dataDonHang.length > 0) {
      let index = 0;
      if (Object.keys(rowSelectionDonHangToPhanCong).length > 0) {
        index = parseInt(Object.keys(rowSelectionDonHangToPhanCong)[0]);
        index = Math.min(index, dataDonHang.length - 1);
      }

      let idDonHang = dataDonHang[index]["SODH"];
      if (typeof idDonHang !== "undefined") {
        // call API voi idDonHang để lấy chi tiết đơn hàng
        // các mã giày và số lượng mà khách đã chọn
        // update lại selection box cho mã giày
        // mỗi lựa chọn sẽ là thông tin khác nhau của form
        // nhớ xử lý vụ size nữa nè
        fetch(
          "http://localhost:8000/donhang?SODH=" + encodeURIComponent(idDonHang)
        )
          .then((response) => {
            return response.json();
          })
          .then((info) => {
            // TODO: lọc những mã giày đã phân công
            // trừ số lượng nó đi
            // làm API giả khéo léo xíu để dễ test nè
            // Để khi user chỉnh sửa danh sách đã phân công thì
            // dễ dàng show ra những đứa chưa phân công thôi
            let list_index_done_phan_cong = [];
            for (let index = 0; index < info.length; index++) {
              // TODO: test khi có columns none khi so sánh
              let col = dataChiTietPhanCong.findIndex(
                (data) =>
                  info[index]["SODH"] === data["SODH"] &&
                  info[index]["MAGIAY"] === data["MAGIAY"] &&
                  info[index]["MAUDE"] === data["MAUDE"] &&
                  info[index]["MAUGOT"] === data["MAUGOT"] &&
                  info[index]["MAUSUON"] === data["MAUSUON"] &&
                  info[index]["MAUCA"] === data["MAUCA"] &&
                  info[index]["MAUQUAI"] === data["MAUQUAI"]
              );
              if (col >= 0) {
                // Cập nhật lại info
                let nof_giay_se_phan_cong = 0;
                for (let key in info[index]) {
                  if (key.includes("SIZE")) {
                    info[index][key] =
                      info[index][key] - dataChiTietPhanCong[col][key];
                    nof_giay_se_phan_cong += info[index][key];
                  }
                }
                if (nof_giay_se_phan_cong == 0) {
                  // delete row done PhanCong
                  list_index_done_phan_cong.push(index);
                }
              }
            }

            // delete index in list_index_done_phan_cong
            let list_data_will_phancong = [];
            for (let index = 0; index < info.length; index++) {
              if (!list_index_done_phan_cong.includes(index)) {
                list_data_will_phancong.push(info[index]);
              }
            }

            setListGiayWillPhanCong(list_data_will_phancong);
            if (list_data_will_phancong.length > 0) {
              setFormPhanCong({
                ...list_data_will_phancong[0],
                THODE: "",
                TENTHODE: "",
                THOQUAI: "",
                TENTHOQUAI: "",
                // SODH: idDonHang,
              });
            } else {
              resetForm();
            }
          })
          .catch((err) => {
            console.log(":error: ", err);
          });
      }
    }
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
    if (formPhanCong["MAGIAY"] === "") return;
    if (formPhanCong["THODE"] === "" || formPhanCong["THOQUAI"] === "") {
      alert("Chọn thợ đế và thợ quai để phân công");
      return;
    }
    let remain = { ...formPhanCong };
    const record = { ...formPhanCong };

    // TODO: khi đoạn này có giá trị null
    // luôn luôn tìm thấy nên ko check lại index
    let index = listGiayWillPhanCong.findIndex(
      (item) =>
        item["MAGIAY"] === formPhanCong["MAGIAY"] &&
        item["MAUQUAI"] === formPhanCong["MAUQUAI"] &&
        item["MAUSUON"] === formPhanCong["MAUSUON"] &&
        item["MAUCA"] === formPhanCong["MAUCA"]
    );
    let is_remain = false;

    let nof_giay_phan_cong = 0;
    for (let key in remain) {
      if (key.includes("SIZE")) {
        nof_giay_phan_cong += parseInt(formPhanCong[key]);
        remain[key] =
          listGiayWillPhanCong[index][key] - parseInt(formPhanCong[key]);
        if (remain[key] > 0) is_remain = true;
      }
    }
    if (nof_giay_phan_cong > 0)
      setDataChiTietPhanCong([...dataChiTietPhanCong, record]);
    if (is_remain) {
      setFormPhanCong({
        ...remain,
        THODE: "",
        TENTHODE: "",
        THOQUAI: "",
        TENTHOQUAI: "",
      });
      listGiayWillPhanCong[index] = remain;
      setListGiayWillPhanCong([...listGiayWillPhanCong]);
    } else {
      // xóa thằng đã phân công xong đi
      listGiayWillPhanCong.splice(index, 1);

      if (listGiayWillPhanCong.length > 0) {
        setListGiayWillPhanCong([...listGiayWillPhanCong]);
        setFormPhanCong({
          ...listGiayWillPhanCong[0],
          THODE: "",
          TENTHODE: "",
          THOQUAI: "",
          TENTHOQUAI: "",
        });
      } else {
        // Khi phân công xong thì nhảy qua thằng tiếp theo
        // nhảy qua đơn hàng tiếp theo
        let index_del = parseInt(Object.keys(rowSelectionDonHangToPhanCong)[0]);
        let id_donhang = dataDonHang[index_del]["SODH"];
        setDataDonHangDaPhanCong([
          ...dataDonHangDaPhanCong,
          dataDonHang[index_del],
        ]);
        // cái dưới chỉ lưu ID, sẽ mắc công lấy lại data
        // => hơi cực nên mình lưu luôn nguyên record đã done phân công
        setListDonHangDonePhanCong([...listDonHangDonePhanCong, id_donhang]);
        dataDonHang.splice(index_del, 1);
        setDataDonHang([...dataDonHang]);
        if (dataDonHang.length > 0 && index_del > 0) {
          index_del -= 1;
          const _row = {};
          _row[index_del] = true;
          setRowSelectionDonHangToPhanCong(_row);
        }
        setListGiayWillPhanCong([]);
        resetForm();
      }
    }
  };
  const handleClickDelete = () => {};
  const handleClickEdit = () => {};
  const handleClickSave = () => {
    // update mode đã phân công cho các đơn hàng trong listDonHangDonePhanCong
    // save thông tin chi tiết từng phân công ở dataChiTietPhanCong
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
      <InfoPhieu infoPhieu={infoPhieu} setInfoPhieu={setInfoPhieu} />
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
          <button onClick={handleClickEdit}>Sửa</button>
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
          <button>Lưu</button>
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
          <InTongHop data={dataChiTietPhanCong} />
        </Modal>
      )}
    </div>
  );
};

export default PhanCong;
