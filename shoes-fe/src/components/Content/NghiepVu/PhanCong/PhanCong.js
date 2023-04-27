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

  const [idDonHangDangPhanCong, setIdDonHangDangPhanCong] = useState();
  const [nofDonHangDangPhanCong, setNofDonHangDangPhanCong] = useState(11);
  // nofDonHangDangPhanCong: để test logic, sau này xóa đi => ko xài
  // thử api đặng test logic thôi

  useEffect(() => {
    console.log("rowSelectionToPhanCong: ", rowSelectionToPhanCong);
    for (var key in rowSelectionToPhanCong) {
      setIdDonHangDangPhanCong(dataDonHang[key]["Số đơn hàng"]);
      setNofDonHangDangPhanCong(dataDonHang[key]["Tổng số lượng đặt hàng"]);
    }
  }, [rowSelectionToPhanCong]);

  useEffect(() => {
    fetch("http://localhost:8000/items_donhang_page_phan_cong")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataDonHang(info);
        setIdDonHangDangPhanCong(info[0]["Số đơn hàng"]);
        setNofDonHangDangPhanCong(info[0]["Tổng số lượng đặt hàng"]);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);
  const handleClickAdd = () => {};
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
        idDonHang={idDonHangDangPhanCong}
        nofDonHangDangPhanCong={nofDonHangDangPhanCong}
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
