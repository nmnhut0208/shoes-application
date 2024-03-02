import { useEffect, useState } from "react";
import clsx from "clsx";
import { Modal } from "~nghiep_vu/DonHang";
import { ItemKyTinhLuong } from "~items";
import styles from "./BangLuong.module.scss";
import In from "./In";
import { CustomAlert } from "~utils/alert_custom";

const BangLuong = () => {
  const [statusModal, setStatusModal] = useState(true);
  const [statusModalIn, setStatusModalIn] = useState(false);
  const [stylePrint, setStylePrint] = useState({});

  const [form, setForm] = useState({
    MAKY: "",
    TENKY: "",
    TYPE: "ALL",
    YEAR: new Date().getFullYear(),
  });
  const [kyValue, setKyValue] = useState("");
  const [kyLabel, setKyLabel] = useState("");

  useEffect(() => {
    setForm({ ...form, MAKY: kyValue, TENKY: kyLabel });
  }, [kyValue]);

  const handlePrint = () => {
    if (form["YEAR"].toString().length != 4) {
      CustomAlert("Năm chưa phù hợp");
      return;
    }
    setStylePrint({});
    setStatusModalIn(true);
  };

  const handleView = () => {
    if (form["YEAR"].toString().length != 4) {
      CustomAlert("Năm chưa phù hợp");
      return;
    }
    setStylePrint({
      "scroll-behavior": "smooth",
      "overflow-y": "overlay",
      "overflow-x": "hidden",
      height: "600px",
    });
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
        {/* <div style={{ marginBottom: "1rem" }}>
          <label style={{ minWidth: "3.5rem" }}>Năm</label>
          <input
            style={{ width: "15rem" }}
            type="number"
            value={form["YEAR"]}
            onChange={(e) => {
              setForm({ ...form, YEAR: e.target.value });
            }}
          />
        </div> */}
        <div>
          <label style={{ minWidth: "3.5rem" }}>Kỳ </label>
          <ItemKyTinhLuong
            value={kyValue}
            setValue={setKyValue}
            label={kyLabel}
            setLabel={setKyLabel}
            size_input={"15rem"}
            have_span={true}
            size_span={"44.5rem"}
            size_selection={"59.5rem"}
          />
        </div>

        <fieldset>
          <legend>Nhóm thợ</legend>
          <div className={styles.group_ratio}>
            <div className={styles.info_ratio}>
              <label for="TD">Thợ đế</label>
              <input
                type="radio"
                id="TD"
                name="option"
                value="TD"
                checked={form["TYPE"] === "TD"}
                onChange={() => setForm({ ...form, TYPE: "TD" })}
              />
            </div>
            <div className={styles.info_ratio}>
              <label for="TQ">Thợ quai</label>
              <input
                type="radio"
                id="TQ"
                name="option"
                value="TQ"
                checked={form["TYPE"] === "TQ"}
                onChange={() => setForm({ ...form, TYPE: "TQ" })}
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
          <button onClick={handleView}>Xem Thông Tin</button>
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
        <In
          data={form}
          setShowModal={setStatusModalIn}
          stylePrint={stylePrint}
        />
      </Modal>
    </Modal>
  );
};

export default BangLuong;
