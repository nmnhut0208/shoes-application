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
  // Phan Cong
  const [dataDonHang, setDataDonHang] = useState(() =>
    renderDataEmpty(INFO_COLS_DONHANG, 6)
  );
  // const [dataChiTietPhanCong, setDataChiTietPhanCong] = useState(() =>
  //   renderDataEmpty(INFO_COLS_CHITIET_PHANCONG, 10)
  // );
  const [dataChiTietPhanCong, setDataChiTietPhanCong] = useState([]);
  const [rowSelectionToPhanCong, setRowSelectionToPhanCong] = useState({});
  const [listGiayWillPhanCong, setListGiayWillPhanCong] = useState([]);
  const [formPhanCong, setFormPhanCong] = useState({});

  const resetForm = () => {
    let form_current = formPhanCong;
    for (let key in form_current) {
      form_current[key] = "";
    }
    setFormPhanCong(form_current);
  };

  useEffect(() => {
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
  }, [rowSelectionToPhanCong]);

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
    // listGiayWillPhanCong
    // formPhanCong
    // TODO: thêm table vừa add vô bảng bên dưới
    const remain = { ...formPhanCong };
    const record = { ...formPhanCong };
    console.log("add vo table: ", record);
    setDataChiTietPhanCong([...dataChiTietPhanCong, record]);
    var index = listGiayWillPhanCong.findIndex(
      (item) => item["Mã giày"] == formPhanCong["Mã giày"]
    );
    let is_remain = false;
    for (let key in remain) {
      if (key.includes("Size")) {
        remain[key] =
          listGiayWillPhanCong[index][key] - parseInt(formPhanCong[key]);
        if (remain[key] > 0) is_remain = true;
      }
    }
    const new_list = listGiayWillPhanCong;
    if (is_remain) {
      setFormPhanCong(remain);

      new_list[index] = remain;
      setListGiayWillPhanCong(new_list);
    } else {
      new_list.splice(index, 1);

      if (new_list.length > 0) {
        setListGiayWillPhanCong(new_list);
        setFormPhanCong(new_list[0]);
      } else {
        // TODO: Khi phân công xong thì nhảy qua thằng tiếp theo
        // nhảy qua đơn hàng tiếp theo
        setListGiayWillPhanCong([]);
        resetForm();
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
        row_each_page={10}
        maxHeight={35}
      />
    </div>
  );
};

export default PhanCong;
