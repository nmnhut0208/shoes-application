import { useState } from "react";
import clsx from "clsx";
import { Modal } from "~nghiep_vu/DonHang";
import { ItemKyTinhLuong } from "~items";
import styles from "./BangLuong.module.scss";
import In from "./In";

const BangLuong = () => {
  const [statusModal, setStatusModal] = useState(true);
  const [statusModalIn, setStatusModalIn] = useState(false);

  const [form, setForm] = useState({ MAKY: "", TENKY: "", TYPE: "ALL" });
  console.log(form);

  const handlePrint = () => {
    setStatusModalIn(true);
  };
  return (
    <Modal
      title="Báo cáo Bảng tính lương - F0052"
      status={statusModal}
      isSaveData={true}
      setShowModal={setStatusModal}
      isResetPageEmpty={true}
    >
      <div className={clsx(styles.page, styles.form)}>
        <label>Kỳ </label>
        <ItemKyTinhLuong
          initValue={{
            MAKY: form["MAKY"],
            TENKY: form["TENKY"],
          }}
          changeData={(data) => {
            setForm({ ...form, ...data });
          }}
          size_input={"15rem"}
          have_span={true}
          size_span={"41.8rem"}
        />
        <fieldset>
          <legend>Nhóm thợ</legend>
          <div className={styles.group_ratio}>
            <div className={styles.info_ratio}>
              <label for="THODE">Thợ đế</label>
              <input
                type="radio"
                id="THODE"
                name="option"
                value="THODE"
                checked={form["TYPE"] === "THODE"}
                onChange={() => setForm({ ...form, TYPE: "THODE" })}
              />
            </div>
            <div className={styles.info_ratio}>
              <label for="THOQUAI">Thợ quai</label>
              <input
                type="radio"
                id="THOQUAI"
                name="option"
                value="THOQUAI"
                checked={form["TYPE"] === "THOQUAI"}
                onChange={() => setForm({ ...form, TYPE: "THOQUAI" })}
              />
            </div>
            <div className={styles.info_ratio}>
              <label for="ALL">Tất cả</label>
              <input
                type="radio"
                id="ALL"
                name="option"
                value="ALL"
                checked={form["TYPE"] === "ALL"}
                onChange={() => setForm({ ...form, TYPE: "ALL" })}
              />
            </div>
          </div>
        </fieldset>

        <div className={styles.group_button}>
          <button onClick={handlePrint}>In Tổng Hợp</button>
        </div>
      </div>

      <Modal
        title="In thông tin lương tổng hợp"
        status={statusModalIn}
        isSaveData={true}
        setShowModal={setStatusModalIn}
        isResetPageEmpty={false}
      >
        <In data={form} setShowModal={setStatusModalIn} />
      </Modal>
    </Modal>
  );
};

export default BangLuong;
