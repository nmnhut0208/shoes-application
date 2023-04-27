import styles from "./PhanCong.module.scss";
import { useState, memo } from "react";
import clsx from "clsx";

const PhanCongForm = () => {
  return (
    <div className={clsx(styles.phan_cong, styles.form)}>
      <h1 className={styles.title_phancong}>Phân công</h1>
      <label>Mã giày</label>
      <input name="Mã giày" />
      <span>Tên giày</span>
      <div className={styles.phancong_remain}>
        <div className={styles.pair}>
          <label>Màu sườn</label>
          <input name="Màu sườn" />
        </div>
        <div className={styles.group_input_row}>
          <div className={styles.pair}>
            <label>Màu cá</label>
            <input name="Màu cá" />
          </div>
          <div className={styles.pair}>
            <label>Màu quai</label>
            <input name="Màu quai" />
          </div>
        </div>
      </div>

      <label>Thợ đế</label>
      <input name="Thợ đế" />
      <span>Tên thợ đế</span>

      <div className={styles.phancong_remain}>
        <div className={styles.pair_tho_quai}>
          <label>Thợ quai</label>
          <input name="Thợ quai" />
          {/* select box */}
        </div>
        <span className={styles.span_thoquai}>Tên thợ quai</span>
      </div>

      <div className={styles.content_size}>
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

      <label>Diễn giải</label>
      <input
        className={styles.input_diengiai}
        name="Diễn giải"
        value="Dien dai"
      />
    </div>
  );
};

export default PhanCongForm;
