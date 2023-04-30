import { useState, memo } from "react";
import clsx from "clsx";
import styles from "../PhanCong.module.scss";

const InfoPhieu = () => {
  const [infoPhieu, setInfoPhieu] = useState({});

  const handleChangeInfoPhieu = (e) => {
    const data = { ...infoPhieu };
    data[e.target.name] = e.target.value;
    setInfoPhieu(data);
  };

  return (
    <div className={clsx(styles.form, styles.input_query)}>
      <div className={styles.pair}>
        <label>Số phiếu</label>
        <input
          value={infoPhieu["Số phiếu"]}
          onChange={(e) => handleChangeInfoPhieu(e)}
          name="Số phiếu"
        />
      </div>
      <div className={styles.pair}>
        <label>Ngày phiếu</label>
        <input
          type="date"
          name="Ngày phiếu"
          value={infoPhieu["Ngày phiếu"]}
          onChange={(e) => handleChangeInfoPhieu(e)}
        />
      </div>
      <div className={styles.pair}>
        <label>Kỳ</label>
        <select
          name="Kỳ"
          id="Kỳ"
          value={infoPhieu["Kỳ"]}
          onChange={(e) => handleChangeInfoPhieu(e)}
        >
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div className={styles.pair}>
        <label>Diễn dãi phiếu</label>
        <input
          name="Diễn dãi phiếu"
          value={infoPhieu["Diễn dãi phiếu"]}
          onChange={(e) => handleChangeInfoPhieu(e)}
        />
      </div>
    </div>
  );
};

export default memo(InfoPhieu);
