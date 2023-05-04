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
} from "./components";
import DonHang from "../DonHang/";
import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";

import styles from "./PhanCong.module.scss";

const infoTableDonHang = processingInfoColumnTable(INFO_COLS_DONHANG);
const infoTableChiTietPhanCong = processingInfoColumnTable(
  INFO_COLS_CHITIET_PHANCONG
);

const PhanCong = () => {
  // Phan Cong
  // TODO: delete button
  const [dataDonHang, setDataDonHang] = useState(() =>
    renderDataEmpty(INFO_COLS_DONHANG, 6)
  );

  const [stateTable, dispatchTable] = useTableContext();
  const [infoFormWillShow, setInfoFormWillShow] = useState({
    chitiet_donhang: false,
    xem_phancong: false,
  });

  const [dataChiTietPhanCong, setDataChiTietPhanCong] = useState([]);
  const [rowSelectionToPhanCong, setRowSelectionToPhanCong] = useState({});
  const [listGiayWillPhanCong, setListGiayWillPhanCong] = useState([]);
  const [formPhanCong, setFormPhanCong] = useState({});
  const [listDonHangDonePhanCong, setListDonHangDonePhanCong] = useState([]);
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
      if (Object.keys(rowSelectionToPhanCong).length > 0) {
        let index = parseInt(Object.keys(rowSelectionToPhanCong)[0]);
        index = Math.min(index, dataDonHang.length - 1);
      }

      let idDonHang = dataDonHang[index]["Số đơn hàng"];
      let soluong = dataDonHang[index]["Tổng số lượng đặt hàng"];
      if (typeof idDonHang !== "undefined") {
        // call API voi idDonHang để lấy chi tiết đơn hàng
        // các mã giày và số lượng mà khách đã chọn
        // update lại selection box cho mã giày
        // mỗi lựa chọn sẽ là thông tin khác nhau của form
        // nhớ xử lý vụ size nữa nè
        fetch("http://localhost:8000/items_donhang_with_id", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: idDonHang, nof: soluong }),
        })
          .then((response) => {
            return response.json();
          })
          .then((info) => {
            setListGiayWillPhanCong(info);
            if (info.length > 0) {
              setFormPhanCong(info[0]);
            } else {
              resetForm();
            }
          })
          .catch((err) => {
            console.log(":error: ", err);
          });
      }
    }
  }, [rowSelectionToPhanCong, dataDonHang]);

  useEffect(() => {
    fetch("http://localhost:8000/items_donhang_page_phan_cong")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataDonHang(info);
        if (info.length > 0)
          setRowSelectionToPhanCong({
            0: true,
          });
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  const handleClickAdd = () => {
    if (formPhanCong["Mã giày"] === "") return;
    let remain = { ...formPhanCong };
    const record = { ...formPhanCong };

    // TODO: khi đoạn này có giá trị null
    let index = listGiayWillPhanCong.findIndex(
      (item) =>
        item["Mã giày"] === formPhanCong["Mã giày"] &&
        item["Màu quai"] === formPhanCong["Màu quai"] &&
        item["Màu sườn"] === formPhanCong["Màu sườn"] &&
        item["Màu cá"] === formPhanCong["Màu cá"]
    );
    let is_remain = false;

    let nof_giay_phan_cong = 0;
    for (let key in remain) {
      if (key.includes("Size")) {
        nof_giay_phan_cong += parseInt(formPhanCong[key]);
        remain[key] =
          listGiayWillPhanCong[index][key] - parseInt(formPhanCong[key]);
        if (remain[key] > 0) is_remain = true;
      }
    }
    if (nof_giay_phan_cong > 0)
      setDataChiTietPhanCong([...dataChiTietPhanCong, record]);
    if (is_remain) {
      setFormPhanCong(remain);
      listGiayWillPhanCong[index] = remain;
      setListGiayWillPhanCong([...listGiayWillPhanCong]);
    } else {
      // xóa thằng đã phân công xong đi
      listGiayWillPhanCong.splice(index, 1);

      if (listGiayWillPhanCong.length > 0) {
        setListGiayWillPhanCong([...listGiayWillPhanCong]);
        setFormPhanCong(listGiayWillPhanCong[0]);
      } else {
        // Khi phân công xong thì nhảy qua thằng tiếp theo
        // nhảy qua đơn hàng tiếp theo
        let index_del = parseInt(Object.keys(rowSelectionToPhanCong)[0]);
        let id_donhang = dataDonHang[index_del]["Số đơn hàng"];
        setListDonHangDonePhanCong([...listDonHangDonePhanCong, id_donhang]);
        dataDonHang.splice(index_del, 1);
        setDataDonHang([...dataDonHang]);
        // setDataDonHang(dataDonHang);
        if (dataDonHang.length > 0 && index_del > 0) {
          index_del -= 1;
          const _row = {};
          _row[index_del] = true;
          setRowSelectionToPhanCong(_row);
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
    });
    dispatchTable(actions_table.setTitleModal("Xem phân công - F0038"));
    dispatchTable(actions_table.setModeShowModal(true));
  };

  return (
    <div className={styles.container}>
      <h2>Phân công - F0037</h2>
      <InfoPhieu />
      <TableDonHang
        columns={infoTableDonHang}
        data={dataDonHang}
        maxHeight={18}
        rowSelection={rowSelectionToPhanCong}
        setRowSelection={setRowSelectionToPhanCong}
      />

      <PhanCongForm
        form={formPhanCong}
        setChiTietPhanCong={setFormPhanCong}
        listGiayWillPhanCong={listGiayWillPhanCong}
      />

      <div className={clsx(styles.button_group, styles.form)}>
        <button onClick={handleClickAdd}>Thêm</button>
        <button onClick={handleClickDelete}>Xóa</button>
        <button onClick={handleClickEdit}>Sửa</button>
      </div>

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
          <button>In tổng hợp</button>
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
            data_init={
              dataChiTietPhanCong[Object.keys(rowSelectionChiTietPhanCong)[0]]
            }
            view={true}
          />
        </Modal>
      )}

      {infoFormWillShow["xem_phancong"] && (
        <Modal>
          <XemPhanCong
            data_init={
              dataChiTietPhanCong[Object.keys(rowSelectionChiTietPhanCong)[0]]
            }
            view={true}
          />
        </Modal>
      )}
    </div>
  );
};

export default PhanCong;
