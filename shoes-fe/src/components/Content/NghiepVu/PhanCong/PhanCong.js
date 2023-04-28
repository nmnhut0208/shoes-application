import clsx from "clsx";
import { useEffect, useState } from "react";

import styles from "./PhanCong.module.scss";
import "./PhanCong.css";
import {
  INFO_COLS_DONHANG,
  INFO_COLS_CHITIET_PHANCONG,
} from "./ConstantVariable";
import {
  renderDataEmpty,
  processingInfoColumnTable,
} from "~utils/processing_data_table";

import InfoPhieu from "./InfoPhieu";
import PhanCongForm from "./PhanCongForm";
import TableDonHang from "./TableDonHang";
import TableChiTietPhanCong from "./TableChiTietPhanCong";

const infoTableDonHang = processingInfoColumnTable(INFO_COLS_DONHANG);
const infoTableChiTietPhanCong = processingInfoColumnTable(
  INFO_COLS_CHITIET_PHANCONG
);

const PhanCong = () => {
  const [dataDonHang, setDataDonHang] = useState(() =>
    renderDataEmpty(INFO_COLS_DONHANG, 6)
  );
  const [dataChiTietPhanCong, setDataChiTietPhanCong] = useState(() =>
    renderDataEmpty(INFO_COLS_CHITIET_PHANCONG, 10)
  );
  const [rowSelectionToPhanCong, setRowSelectionToPhanCong] = useState({
    0: true,
  });
  const [listGiayWillPhanCong, setListGiayWillPhanCong] = useState([]);
  const [formPhanCong, setFormPhanCong] = useState({});
  console.log("formPhanCong: ", formPhanCong);

  useEffect(() => {
    console.log("rowSelectionToPhanCong: ", rowSelectionToPhanCong);
    for (var key in rowSelectionToPhanCong) {
      let idDonHang = dataDonHang[key]["Số đơn hàng"];
      let soluong = dataDonHang[key]["Tổng số lượng đặt hàng"];
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
            console.log("info: ", info);
            console.log("info 0: ", info[0]);
            console.log("Mã giày", info[0]["Mã giày"]);
            setListGiayWillPhanCong(info);
          })
          .catch((err) => {
            console.log(":error: ", err);
          });
      }
    }
  }, [rowSelectionToPhanCong]);

  useEffect(() => {
    fetch("http://localhost:8000/items_donhang_page_phan_cong")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataDonHang(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  const handleClickAdd = () => {
    // listGiayWillPhanCong
    // formPhanCong
    console.log("formPhanCong: ", formPhanCong);
    const remain = { ...formPhanCong };
    var index = listGiayWillPhanCong.findIndex(
      (item) => item["Mã giày"] == formPhanCong["Mã giày"]
    );
    console.log("===========");
    console.log("remain: ", remain);
    console.log("index: ", index);
    let is_remain = false;
    for (let key in remain) {
      if (key.includes("Size")) {
        remain[key] =
          listGiayWillPhanCong[index][key] - parseInt(formPhanCong[key]);
        if (remain[key] > 0) is_remain = true;
      }
    }
    console.log("is_remain: ", is_remain);
    console.log("listGiayWillPhanCong ban dau: ", listGiayWillPhanCong);

    if (is_remain) setFormPhanCong(formPhanCong);
    else {
      const new_list = [
        ...listGiayWillPhanCong.slice(0, index),
        ...listGiayWillPhanCong.slice(index + 1, listGiayWillPhanCong.length),
      ];
      console.log("listGiayWillPhanCong: ", listGiayWillPhanCong);
      console.log("new_list: ", new_list);
      if (new_list.length > 0) {
        setListGiayWillPhanCong(new_list);
        setFormPhanCong(new_list[0]);
      } else {
        // TODO: Khi phân công xong thì nhảy qua thằng tiếp theo
        // nhảy qua đơn hàng tiếp theo
        setListGiayWillPhanCong([]);
      }
    }
  };
  const handleClickDelete = () => {};
  const handleClickEdit = () => {};

  return (
    <div className={styles.container}>
      <h2>Phân công - F0037</h2>
      <InfoPhieu />
      <TableDonHang
        columns={infoTableDonHang}
        data={dataDonHang}
        row_each_page={10}
        maxHeight={15}
        rowSelection={rowSelectionToPhanCong}
        setRowSelection={setRowSelectionToPhanCong}
      />

      <PhanCongForm
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
        row_each_page={10}
        maxHeight={35}
      />
    </div>
  );
};

export default PhanCong;
