import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./FormGiayBasic.module.scss";

const FormGiayBasic = ({ initForm, setDataForm }) => {
  const [form, setForm] = useState(() => initForm);
  useEffect(() => {
    setForm(initForm);
  }, [initForm]);
  console.log("record form FormGiayBasic: re-render");

  const [image_base64, setImageBase64] = useState("");
  const [image_url, setImageURL] = useState("");

  const handleChangeInformationForm = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
    setDataForm(data);
  };

  const changeImage = (e) => {
    if (e.target.value !== "") {
      var reader = new FileReader();
      reader.onload = function () {
        let base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        setImageBase64("data:image/png;base64,".concat(base64String));
        // TODO: update form to save image to database
      };
      reader.readAsDataURL(e.target.files[0]);
      setImageURL("");
    }
  };

  return (
    <div className={styles.form}>
      <div class={styles.form}>
        <div className={styles.group_first}>
          <div className={styles.group_first__left}>
            <div className={styles.group_first__left_row}>
              <label>Mã giày</label>
              <input
                value={form["Mã giày"]}
                onChange={(e) => handleChangeInformationForm(e)}
                name="Mã giày"
                className={styles.item_size_middle}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã tham chiếu</label>
              <input
                name="Mã tham chiếu"
                value={form["Mã tham chiếu"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_middle}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Tên giày</label>
              <input
                name="Tên giày"
                value={form["Tên giày"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_big}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Khách hàng</label>
              <input
                name="Khách hàng"
                value={form["Khách hàng"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã đế</label>
              <input
                name="Mã đế"
                value={form["Mã đế"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span>Tên đế</span>
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã sườn</label>
              <input
                name="Mã sườn"
                value={form["Mã sườn"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span>Tên sườn</span>
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã cá</label>
              <input
                name="Mã cá"
                value={form["Mã cá"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span>Tên cá</span>
            </div>
          </div>

          <div className={styles.group_first__right}>
            <div className={styles.group_first__right_image}>
              <label className={styles.label_choose_image} for="img">
                Chọn hình ảnh
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="img"
                name="img"
                accept="image/*"
                value={image_url}
                onChange={(e) => changeImage(e)}
              />
              <img src={image_base64} />
            </div>
          </div>
        </div>

        <div className={styles.group_second}>
          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Mã quai</label>
              <input
                name="Mã quai"
                value={form["Mã quai"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span>Tên quai</span>
            </div>

            <div className={styles.group_second_row__right}>
              <div className={styles.group_second_row__right_pair}>
                <label>Giá trang trí</label>
                <input
                  name="Giá trang trí"
                  value={form["Giá trang trí"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>

              <div className={styles.group_second_row__right_pair}>
                <label className={styles.label_custom}>Giá tân trang</label>
                <input
                  name="Giá tân trang"
                  value={form["Giá tân trang"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Màu</label>
              <input
                name="Màu"
                value={form["Màu"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span> Tên màu </span>
            </div>

            <div className={styles.group_second_row__right}>
              <div className={styles.group_second_row__right_pair}>
                <label>Giá sườn</label>
                <input
                  name="Giá sườn"
                  value={form["Giá sườn"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>

              <div className={styles.group_second_row__right_pair}>
                <label className={styles.label_custom}>Nhân công</label>
                <input
                  name="Nhân công"
                  value={form["Nhân công"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Đơn giá</label>
              <input
                name="Đơn giá"
                value={form["Đơn giá"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_middle}
              />
            </div>
            <div className={styles.group_second_row__right}>
              <div className={styles.group_second_row__right_pair}>
                <label>Giá gót</label>
                <input
                  name="Giá gót"
                  value={form["Giá gót"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
              <div className={styles.group_second_row__right_pair}>
                <label className={styles.label_custom}>Giá keo</label>
                <input
                  name="Giá keo"
                  value={form["Giá keo"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Ghi chú</label>
              <input
                name="Ghi chú"
                value={form["Ghi chú"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_big}
              />
            </div>

            <div className={styles.group_second_row__right}>
              <div
                className={clsx(
                  styles.group_second_row__right_pair,
                  styles.group_second_row__right_gia_von
                )}
              >
                <label>Giá vốn</label>
                <input
                  name="Giá vốn"
                  value={form["Giá vốn"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.group_third}>
          <div className={styles.group_third_row}>
            <div className={styles.group_third_row_item}>
              <label>Trang trí đế</label>
              <textarea
                name="Trang trí đế"
                value={form["Trang trí đế"]}
                onChange={(e) => handleChangeInformationForm(e)}
              />
            </div>

            <div className={styles.group_third_row_item}>
              <label>Trang trí quai</label>
              <textarea
                name="Trang trí quai"
                value={form["Trang trí quai"]}
                onChange={(e) => handleChangeInformationForm(e)}
              />
            </div>
          </div>

          <div className={styles.group_third_row}>
            <div className={styles.group_third_row_item}>
              <label>Ghi chú đế</label>
              <textarea
                name="Ghi chú đế"
                value={form["Ghi chú đế"]}
                onChange={(e) => handleChangeInformationForm(e)}
              />
            </div>

            <div className={styles.group_third_row_item}>
              <label>Ghi chú quai</label>
              <textarea
                name="Ghi chú quai"
                value={form["Ghi chú quai"]}
                onChange={(e) => handleChangeInformationForm(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGiayBasic;
