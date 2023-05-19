import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./FormGiayBasic.module.scss";

const FormGiayBasic = ({ initForm, setDataForm, mode }) => {
  const [form, setForm] = useState(() => initForm);
  const [image_base64, setImageBase64] = useState("");
  const [image_url, setImageURL] = useState("");
  useEffect(() => {
    setForm(initForm);
    setImageBase64(initForm["HINHANH"]);
  }, [initForm]);

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
        let image = "data:image/png;base64,".concat(base64String);
        setImageBase64(image);
        setDataForm({ ...form, HINHANH: image });
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
                readOnly={mode === "edit"}
                value={form["MAGIAY"]}
                onChange={(e) => handleChangeInformationForm(e)}
                name="MAGIAY"
                className={styles.item_size_middle}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã tham chiếu</label>
              <input
                name="SortID"
                value={form["SortID"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_middle}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Tên giày</label>
              <input
                name="TENGIAY"
                value={form["TENGIAY"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_big}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Khách hàng</label>
              <input
                name="MAKH"
                value={form["MAKH"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã đế</label>
              <input
                name="MADE"
                value={form["MADE"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span>{form["TENDE"]}</span>
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã sườn</label>
              <input
                name="MASUON"
                value={form["MASUON"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span>{form["TENSUON"]}</span>
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã cá</label>
              <input
                name="MACA"
                value={form["MACA"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span>{form["TENCA"]}</span>
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
              {/* TODO: chinh lai thanh database ne */}
            </div>
          </div>
        </div>

        <div className={styles.group_second}>
          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Mã quai</label>
              <input
                name="MAQUAI"
                value={form["MAQUAI"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span>{form["TENQUAI"]}</span>
            </div>

            <div className={styles.group_second_row__right}>
              <div className={styles.group_second_row__right_pair}>
                <label>Giá trang trí</label>
                <input
                  name="GIATRANGTRI"
                  value={form["GIATRANGTRI"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>

              <div className={styles.group_second_row__right_pair}>
                <label className={styles.label_custom}>Giá tân trang</label>
                <input
                  name="GIATANTRANG"
                  value={form["GIATANTRANG"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Màu</label>
              <input
                name="MAMAU"
                value={form["MAMAU"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span> {form["TENMAU"]} </span>
            </div>

            <div className={styles.group_second_row__right}>
              <div className={styles.group_second_row__right_pair}>
                <label>Giá sườn</label>
                <input
                  name="GIASUON"
                  value={form["GIASUON"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>

              <div className={styles.group_second_row__right_pair}>
                <label className={styles.label_custom}>Nhân công</label>
                <input
                  name="GIANHANCONG"
                  value={form["GIANHANCONG"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Đơn giá</label>
              <input
                name="DONGIA"
                value={form["DONGIA"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_middle}
              />
            </div>
            <div className={styles.group_second_row__right}>
              <div className={styles.group_second_row__right_pair}>
                <label>Giá gót</label>
                <input
                  name="GIAGOT"
                  value={form["GIAGOT"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
              <div className={styles.group_second_row__right_pair}>
                <label className={styles.label_custom}>Giá keo</label>
                <input
                  name="GIAKEO"
                  value={form["GIAKEO"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Ghi chú</label>
              <input
                name="GHICHU"
                value={form["GHICHU"]}
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
                  name="GIAVON"
                  value={form["GIAVON"]}
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
                name="TRANGTRIDE"
                value={form["TRANGTRIDE"]}
                onChange={(e) => handleChangeInformationForm(e)}
              />
            </div>

            <div className={styles.group_third_row_item}>
              <label>Trang trí quai</label>
              <textarea
                name="TRANGTRIQUAI"
                value={form["TRANGTRIQUAI"]}
                onChange={(e) => handleChangeInformationForm(e)}
              />
            </div>
          </div>

          <div className={styles.group_third_row}>
            <div className={styles.group_third_row_item}>
              <label>Ghi chú đế</label>
              <textarea
                name="GHICHUDE"
                value={form["GHICHUDE"]}
                onChange={(e) => handleChangeInformationForm(e)}
              />
            </div>

            <div className={styles.group_third_row_item}>
              <label>Ghi chú quai</label>
              <textarea
                name="GHICHUQUAI"
                value={form["GHICHUQUAI"]}
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
