import styles from "./PhanCong.module.scss";
import { useState, memo, useEffect } from "react";
import clsx from "clsx";

const PhanCongForm = ({
  idDonHang,
  nofDonHangDangPhanCong,
  setChiTietPhanCong,
}) => {
  console.log("PhanCongForm re-render", idDonHang, nofDonHangDangPhanCong);
  /*
  1 đơn hàng có nhiều mã giày, nên sẽ cập nhật lại select option của
  giày => những thông tin liên quan khác tới giày chỉ show ra chứ ko sửa

  Những thông tin liên quan tới phân công: thợ, size thì mới cho sửa
   */
  const [form, setForm] = useState({});
  const [listDonHang, setListDonHang] = useState([]);
  useEffect(() => {
    console.log("goi api", idDonHang, typeof idDonHang === "undefined");
    if (typeof idDonHang === "undefined") {
      console.log("HAHAHAH");
    } else {
      // call API voi idDonHang để lấy chi tiết đơn hàng
      // các mã giày và số lượng mà khách đã chọn
      // update lại selection box cho mã giày
      // mỗi lựa chọn sẽ là thông tin khác nhau của form
      // nhớ xử lý vụ size nữa nè
      fetch("http://localhost:8000/items_donhang_with_id", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idDonHang, nof: nofDonHangDangPhanCong }),
      })
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          console.log("info: ", nofDonHangDangPhanCong, info);
          console.log("info 0: ", nofDonHangDangPhanCong, info[0]);

          setListDonHang(info);
          setForm(info[0]);
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    }
  }, [idDonHang]);
  const handleChangeForm = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };
  return (
    <div className={clsx(styles.phan_cong, styles.form)}>
      <h1 className={styles.title_phancong}>Phân công</h1>
      <label>Mã giày</label>
      <input
        name="Mã giày"
        value={form["Mã giày"]}
        onChange={(e) => handleChangeForm(e)}
      />
      <span>{form["Tên giày"]}</span>
      <div className={styles.phancong_remain}>
        <div className={styles.pair}>
          <label>Màu sườn</label>
          <input name="Màu sườn" value={form["Màu sườn"]} />
        </div>
        <div className={styles.group_input_row}>
          <div className={styles.pair}>
            <label>Màu cá</label>
            <input name="Màu cá" value={form["Màu cá"]} />
          </div>
          <div className={styles.pair}>
            <label>Màu quai</label>
            <input name="Màu quai" value={form["Màu quai"]} />
          </div>
        </div>
      </div>

      <label>Thợ đế</label>
      <input
        name="Thợ đế"
        value={form["Thợ đế"]}
        onChange={(e) => handleChangeForm(e)}
      />
      <span>{form["Thợ đế"]}</span>

      <div className={styles.phancong_remain}>
        <div className={styles.pair_tho_quai}>
          <label>Thợ quai</label>
          <input
            name="Thợ quai"
            value={form["Thợ quai"]}
            onChange={(e) => handleChangeForm(e)}
          />
          {/* select box */}
        </div>
        <span className={styles.span_thoquai}>{form["Thợ quai"]}</span>
      </div>

      <div className={styles.content_size}>
        <div className={styles.pair_info}>
          <label>Size 0</label>
          <input
            name="Size 0"
            value={form["Size 0"]}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 5</label>
          <input
            name="Size 5"
            value={form["Size 5"]}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 6</label>
          <input
            name="Size 6"
            value={form["Size 6"]}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 7</label>
          <input
            name="Size 7"
            value={form["Size 7"]}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 8</label>
          <input
            name="Size 8"
            value={form["Size 8"]}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 9</label>
          <input
            name="Size 9"
            value={form["Size 9"]}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
      </div>

      <label>Diễn giải</label>
      <input
        className={styles.input_diengiai}
        name="Diễn giải"
        value={form["Diễn giải"]}
        onChange={(e) => handleChangeForm(e)}
      />
    </div>
  );
};

export default memo(PhanCongForm);
