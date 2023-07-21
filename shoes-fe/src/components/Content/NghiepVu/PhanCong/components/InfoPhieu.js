import { memo, useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";

import styles from "../FormNghiepVuPhanCong/FormNghiepVuPhanCong.module.scss";
import { convertDate } from "~utils/processing_date";
import { ItemKyTinhLuong } from "~items";

const InfoPhieu = ({ infoPhieu, setInfoPhieu, view }) => {
  console.log("re-render InfoPhieu: ", infoPhieu);
  const [kyTinhLuong, setKyTinhLuong] = useState("");
  const handleChangeInfoPhieu = (e) => {
    const data = { ...infoPhieu };
    data[e.target.name] = e.target.value;
    setInfoPhieu(data);
  };

  const handleChangeFormForTypeDate = (e) => {
    const data = { ...infoPhieu };
    data[e.target.name] = moment(e.target.value, "YYYY-MM-DD").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    setInfoPhieu(data);
  };

  useEffect(() => {
    setInfoPhieu({ ...infoPhieu, MAKY: kyTinhLuong });
  }, [kyTinhLuong]);

  return (
    <div className={clsx(styles.form, styles.input_query)}>
      <div className={styles.pair}>
        <label>Số phiếu</label>
        <input
          value={infoPhieu["SOPHIEU"]}
          onChange={(e) => handleChangeInfoPhieu(e)}
          name="SOPHIEU"
          readOnly={true}
        />
      </div>
      <div className={styles.pair}>
        <label>Ngày phiếu</label>
        <input
          type="date"
          name="NGAYPHIEU"
          value={convertDate(infoPhieu["NGAYPHIEU"])}
          onChange={(e) => handleChangeFormForTypeDate(e)}
        />
      </div>
      <div className={styles.pair}>
        <label>Kỳ</label>
        <ItemKyTinhLuong
          value={infoPhieu["MAKY"]}
          setValue={setKyTinhLuong}
          size_input={"7rem"}
          readOnly={view}
        />
      </div>
      <div className={styles.pair}>
        <label>Diễn dãi phiếu</label>
        <input
          name="DIENGIAIPHIEU"
          value={infoPhieu["DIENGIAIPHIEU"]}
          onChange={(e) => handleChangeInfoPhieu(e)}
          readOnly={view}
        />
      </div>
    </div>
  );
};

export default memo(InfoPhieu);
