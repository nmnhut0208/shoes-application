import moment from "moment";
import { memo } from "react";

import { ItemKhachHang } from "~items";
import { convertDate } from "~utils/processing_date";
import styles from "./FormInfoDonHang.module.scss";

const FormInfoDonHang = ({
  formInfoDonHang,
  setFormInfoDonHang,
  setIsSaveData,
  view,
}) => {
  const handleChangeForm = (e) => {
    const data = { ...formInfoDonHang };
    data[e.target.name] = e.target.value;
    setFormInfoDonHang(data);
    setIsSaveData(false);
  };

  const handleChangeFormForTypeDate = (e) => {
    const data = { ...formInfoDonHang };
    data[e.target.name] = moment(e.target.value, "YYYY-MM-DD").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    setFormInfoDonHang(data);
    setIsSaveData(false);
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
              initValue={{
                MAKH: formInfoDonHang["MAKH"],
                TENKH: formInfoDonHang["TENKH"],
              }}
              changeData={(data) => {
                setFormInfoDonHang({ ...formInfoDonHang, ...data });
              }}
              size_input={"15rem"}
              size_span={"29.7rem"}
              have_span={true}
              readOnly={view}
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
