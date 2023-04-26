import clsx from "clsx";
import { useEffect, useState } from "react";

import { rem_to_px } from "~config/ui";
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

import SubTable from "./SubTable";

const infoTableDonHang = processingInfoColumnTable(INFO_COLS_DONHANG);
const infoTableChiTietPhanCong = processingInfoColumnTable(
  INFO_COLS_CHITIET_PHANCONG
);

const PhanCong = () => {
  const [dataDonHang, setDataDonHang] = useState(() =>
    renderDataEmpty(INFO_COLS_DONHANG, 23)
  );
  const [dataChiTietPhanCong, setDataChiTietPhanCong] = useState(() =>
    renderDataEmpty(INFO_COLS_CHITIET_PHANCONG, 21)
  );

  const handleClickAdd = () => {};
  const handleClickDelete = () => {};
  const handleClickEdit = () => {};

  return (
    <div>
      <h2>Phân công - F0037</h2>
      <div className={clsx(styles.area_flex, styles.form, styles.input_query)}>
        <div className={clsx(styles.row_content, styles.form)}>
          <div className={styles.pair_info}>
            <label>Số phiếu</label>
            <input name="Số phiếu" />
          </div>
          <div className={styles.pair_info}>
            <label>Ngày phiếu</label>
            <input name="Ngày phiếu" />
          </div>
          <div className={styles.pair_info}>
            <label>Kỳ</label>
            <select name="Kỳ" id="Kỳ">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div className={styles.pair_info}>
            <label>Diễn dãi phiếu</label>
            <input name="Diễn dãi phiếu" />
          </div>
        </div>
      </div>

      <div className={(styles.area_flex, styles.tableDonHang)}>
        <SubTable
          columns={infoTableDonHang}
          data={dataDonHang}
          row_each_page={10}
          maxHeight={22 * rem_to_px}
        />
      </div>

      <div className={styles.area_flex}>
        <h1 className={styles.row_content}>Phân công</h1>
        <div
          className={clsx(styles.row_content, styles.form, styles.info_giay)}
        >
          <div className={styles.pair_info}>
            <label>Mã giày</label>
            <input name="Mã giày" />
            {/* slelect box ne */}
            <span>Tên giày</span>
          </div>
          <div className={styles.pair_info}>
            <label>Màu sườn</label>
            <input name="Màu sườn" />
          </div>
          <div className={styles.pair_info}>
            <label>Màu cá</label>
            <input name="Màu cá" />
          </div>
          <div className={styles.pair_info}>
            <label>Màu quai</label>
            <input name="Màu quai" />
          </div>
        </div>

        <div className={clsx(styles.row_content, styles.form, styles.info_tho)}>
          <div className={styles.pair_info}>
            <label>Thợ đế</label>
            <input name="Thợ đế" />
            {/* select box */}
            <span>Tên thợ đế</span>
          </div>

          <div className={styles.pair_info}>
            <label>Thợ quai</label>
            <input name="Thợ quai" />
            {/* select box */}
            <span>Tên thợ quai</span>
          </div>
        </div>
        <div
          className={clsx(styles.row_content, styles.form, styles.content_size)}
        >
          <div className={styles.pair_info}>
            <label>Size 0</label>
            <input name="Size 0" />
          </div>
          <div className={styles.pair_info}>
            <label>Size 5</label>
            <input name="Size 5" />
          </div>
          <div className={styles.pair_info}>
            <label>Size 6</label>
            <input name="Size 6" />
          </div>
          <div className={styles.pair_info}>
            <label>Size 7</label>
            <input name="Size 7" />
          </div>
          <div className={styles.pair_info}>
            <label>Size 8</label>
            <input name="Size 8" />
          </div>
          <div className={styles.pair_info}>
            <label>Size 9</label>
            <input name="Size 9" />
          </div>
        </div>
        <div
          className={clsx(
            styles.row_content,
            styles.form,
            styles.content_dien_dai
          )}
        >
          <label>Diễn giải</label>
          <input name="Diễn giải" />
        </div>
      </div>

      <div className={styles.area_flex}>
        <div className={clsx(styles.button_group, styles.form)}>
          <button onClick={handleClickAdd}>Thêm</button>
          <button onClick={handleClickDelete}>Xóa</button>
          <button onClick={handleClickEdit}>Sửa</button>
        </div>
      </div>

      <div className={styles.area_flex}>
        <SubTable
          columns={infoTableChiTietPhanCong}
          data={dataChiTietPhanCong}
          row_each_page={10}
          maxHeight={40 * rem_to_px}
        />
      </div>
    </div>
  );
};

export default PhanCong;
