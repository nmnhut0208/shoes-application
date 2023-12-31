import moment from "moment";
import { memo, useState, useEffect } from "react";

import { ItemKhachHang } from "~items";
import { convertDate } from "~utils/processing_date";
import styles from "./FormInfoDonHang.module.scss";

const FormInfoDonHang = ({ formInfoDonHang, setFormInfoDonHang, view, action }) => {
  console.log("re-render FormInfoDonHang");
  const handleChangeForm = (e) => {
    const data = { ...formInfoDonHang };
    data[e.target.name] = e.target.value;
    setFormInfoDonHang(data);
  };

  const [maKH, setMaKH] = useState("");
  const [tenKH, setTenKH] = useState("");
  useEffect(() => {
    setFormInfoDonHang({
      ...formInfoDonHang,
      MAKH: maKH,
      TENKH: tenKH,
    });
  }, [maKH]);

  const handleChangeFormForTypeDate = (e) => {
    const data = { ...formInfoDonHang };
    data[e.target.name] = moment(e.target.value, "YYYY-MM-DD").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    setFormInfoDonHang(data);
  };

  return (
    <div className={styles.form}>
      <div className={styles.group_item}>
        <div className={styles.item_column}>
          <div className={styles.pair}>
            <label>Số đơn hàng</label>
            <input
              name="SODH"
              value={formInfoDonHang["SODH"]}
              onChange={(e) => handleChangeForm(e)}
              readOnly={true}
            />
          </div>
        </div>
        <div className={styles.item_column}>
          <div className={styles.pair}>
            <label>Mã khách hàng</label>
            <ItemKhachHang
              value={formInfoDonHang["MAKH"]}
              setValue={setMaKH}
              label={formInfoDonHang["TENKH"]}
              setLabel={setTenKH}
              size_input={"15rem"}
              size_span={"29.7rem"}
              have_span={true}
              readOnly={view || action === 'edit'}
            />
          </div>
        </div>
      </div>
      <div className={styles.group_item}>
        <div className={styles.item_column}>
          <div className={styles.pair}>
            <label>Ngày đơn hàng</label>
            <input
              type="date"
              name="NGAYDH"
              value={convertDate(formInfoDonHang["NGAYDH"])}
              onChange={(e) => handleChangeFormForTypeDate(e)}
              readOnly={view}
            />
          </div>
          <div className={styles.pair}>
            <label>Ngày giao hàng</label>
            <input
              type="date"
              name="NGAYGH"
              value={convertDate(formInfoDonHang["NGAYGH"])}
              onChange={(e) => handleChangeFormForTypeDate(e)}
              readOnly={view}
            />
          </div>
        </div>
        <div className={styles.item_column}>
          <div className={styles.pair}>
            <label className={styles.label_for_textatea}>Diễn dãi</label>
            <textarea
              name="DIENGIAIPHIEU"
              value={formInfoDonHang["DIENGIAIPHIEU"]}
              onChange={(e) => handleChangeForm(e)}
              readOnly={view}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FormInfoDonHang);
