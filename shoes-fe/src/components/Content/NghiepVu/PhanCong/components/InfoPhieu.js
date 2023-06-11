import { memo, useState } from "react";
import clsx from "clsx";
import moment from "moment";

import styles from "../PhanCong.module.scss";
import { convertDate } from "~utils/processing_date";
import { useItemsContext } from "~items_context";

const InfoPhieu = ({ infoPhieu, setInfoPhieu, setHavedSaveData }) => {
  const [stateItem, dispatchItem] = useItemsContext();
  const [dataKyTinhLuong, setDataKyTinhLuong] = useState(
    stateItem.infoItemKyTinhLuong
  );
  console.log("stateItem.infoItemKyTinhLuong: ", stateItem.infoItemKyTinhLuong);

  const handleChangeInfoPhieu = (e) => {
    const data = { ...infoPhieu };
    data[e.target.name] = e.target.value;
    setInfoPhieu(data);
    setHavedSaveData(false);
  };

  const handleChangeFormForTypeDate = (e) => {
    const data = { ...infoPhieu };
    data[e.target.name] = moment(e.target.value, "YYYY-MM-DD").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    setInfoPhieu(data);
    setHavedSaveData(false);
  };

  return (
    <div className={clsx(styles.form, styles.input_query)}>
      <div className={styles.pair}>
        <label>Số phiếu</label>
        <input
          value={infoPhieu["SOPHIEU"]}
          onChange={(e) => handleChangeInfoPhieu(e)}
          name="SOPHIEU"
        />
      </div>
      <div className={styles.pair}>
        <label>Ngày phiếu</label>
        <input
          type="date"
          name="NGAYPHIEU"
          // value={infoPhieu["NGAYPHIEU"]}
          value={convertDate(infoPhieu["NGAYPHIEU"])}
          onChange={(e) => handleChangeFormForTypeDate(e)}
          // onChange={(e) => handleChangeInfoPhieu(e)}
        />
      </div>
      <div className={styles.pair}>
        <label>Kỳ</label>
        <select
          name="MAKY"
          id="MAKY"
          value={infoPhieu["MAKY"]}
          onChange={(e) => handleChangeInfoPhieu(e)}
        >
          {dataKyTinhLuong.map((data, index) => (
            <option value={data["value"]} key={index}>
              {data["label"]}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.pair}>
        <label>Diễn dãi phiếu</label>
        <input
          name="DIENGIAIPHIEU"
          value={infoPhieu["DIENGIAIPHIEU"]}
          onChange={(e) => handleChangeInfoPhieu(e)}
        />
      </div>
    </div>
  );
};

export default memo(InfoPhieu);
