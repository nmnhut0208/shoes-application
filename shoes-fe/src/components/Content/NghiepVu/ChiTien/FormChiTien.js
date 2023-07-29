import { useState } from "react";
import clsx from "clsx";
import styles from "./FormChiTien.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormChiTien = () => {
  const [stateTable, dispatchTable] = useTableContext();

  return (
    <div className={styles.form}>
      <form>
        <div className={styles.group_first}>
          <div className={styles.group_first_row}>
            <div className="styles.group_first_row_between">
              <label>Số phiếu</label>
              <input name="Số phiếu" className={styles.item_size_small} />
            </div>
            <div className="styles.group_first_row_between">
              <label>Ngày phiếu</label>
              <input
                type="date"
                name="Ngày phiếu"
                className={styles.item_size_small}
              />
            </div>
          </div>
        </div>
        <div className={styles.group_second}>
          <div className={styles.group_second_row}>
            <label>Loại chi</label>
            <input name="Loại chi" className={styles.item_size_big} />
          </div>
          <div className={styles.group_second_row}>
            <label>Nhân viên</label>
            <input name="Nhân viên 1" className={styles.item_size_small} />
            <input name="Nhân viên 2" className={styles.item_size_small_1} />
          </div>
          <div className={styles.group_second_row}>
            <label>Số tiền</label>
            <input name="Số tiền" className={styles.item_size_small} />
          </div>
          <div className={styles.group_second_row}>
            <label>Diễn giải</label>
            <input name="Diễn giải" className={styles.item_size_big} />
          </div>
        </div>
        <div className={styles.group_button}>
          <div>
            <button
            // onClick={handleSaveFrom}
            >
              Lưu
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormChiTien;
