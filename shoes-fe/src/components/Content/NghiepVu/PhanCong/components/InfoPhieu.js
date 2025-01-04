import { memo, useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";

import styles from "../FormNghiepVuPhanCong/FormNghiepVuPhanCong.module.scss";
import { convertDate } from "~utils/processing_date";
import { ItemKyTinhLuong } from "~items";

const InfoPhieu = ({ infoPhieu, setInfoPhieu, view }) => {
  const [kyTinhLuong, setKyTinhLuong] = useState(() => {
    return infoPhieu["MAKY"];
  });

  const handleChangeInfoPhieu = (e) => {
    const data = { ...infoPhieu };
    data[e.target.name] = e.target.value;
    setInfoPhieu(data);
  };

  const handleChangeFormForTypeDate = (e) => {
    const data = { ...infoPhieu };
    data[e.target.name] = moment(e.target.value, "YYYY-MM-DD")
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .format("YYYY-MM-DD HH:mm:ss");
    setInfoPhieu(data);
  };

  useEffect(() => {
    setInfoPhieu({ ...infoPhieu, MAKY: kyTinhLuong });
  }, [kyTinhLuong]);

  return (
    <div className={clsx(styles.form, styles.input_query)}
      style={{ alignItems: "center" }}>
      <div className={styles.pair}>
        <label>Số phiếu</label>
        <input
          type="text"
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
      <div
        className={styles.pair}
        style={{
          width: "150px",
          display: "flex",
          flexDirection: "row",
          marginLeft: "2.5rem",
          alignItems: "center"
        }}
      >
        <label>Kỳ</label>
        <ItemKyTinhLuong
          value={infoPhieu["MAKY"]}
          setValue={setKyTinhLuong}
          size_input={"8rem"}
          size_selection={"20rem"}
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
          autocomplete="off"
        />
      </div>
    </div>
  );
};

export default memo(InfoPhieu);
