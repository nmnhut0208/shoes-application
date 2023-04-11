import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./FormGiay.module.scss";

const FormGiay = ({ record, setRecord, handleCancel }) => {
  const [inputForm, setInputForm] = useState(record);
  console.log("record form: re-render");

  var image_url =
    "https://img.freepik.com/free-vector/cats-doodle-pattern-background_53876-100663.jpg?w=900&t=st=1680945739~exp=1680946339~hmac=0a6288d0cf4d9b1a566b96eeaad8db3beb69fa0729f4ffecfcc866bbfecaf4e2";
  // var image_url = "https://images.unsplash.com/photo-1589816365021-a76a9422f6a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"

  const handleChangeInformationForm = (e) => {
    const data = { ...inputForm };
    data[e.target.name] = e.target.value;
    setInputForm(data);
    setRecord(e.target.value);
  };

  const handleSaveFrom = () => {
    // saveDataBase()
    setRecord(inputForm);
    handleCancel(false);
  };

  return (
    <div className={clsx(styles.form)}>
      <form
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      >
        <div className={styles.group_first}>
          <div className={styles.group_first__left}>
            <div className={styles.group_first__left_row}>
              <label>Mã giày:</label>
              <input
                value={inputForm["Mã giày"]}
                onChange={(e) => handleChangeInformationForm(e)}
                name="Mã giày"
                className={styles.item_size_middle}
              />
            </div>
            <div className={styles.group_first__left_row}>
              <label>Mã tham chiếu:</label>
              <input
                name="Mã tham chiếu"
                value={inputForm["Mã tham chiếu"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_middle}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Tên giày:</label>
              <input
                name="Tên giày"
                value={inputForm["Tên giày"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_big}
              />
            </div>
            <div className={styles.group_first__left_row}>
              <label>Khách hàng:</label>
              <input
                name="Khách hàng"
                value={inputForm["Khách hàng"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã đế:</label>
              <input
                name="Mã đế"
                value={inputForm["Mã đế"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span> Tên đế </span>
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã sườn:</label>
              <input
                name="Mã sườn"
                value={inputForm["Mã sườn"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span> Tên sườn </span>
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã cá:</label>
              <input
                name="Mã cá"
                value={inputForm["Mã cá"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span> Tên cá </span>
            </div>
          </div>

          <div className={styles.group_first__right}>
            <div className={styles.group_first__right_image}>
              <button>Chọn hình ảnh</button>
              <img src={image_url} />
            </div>
          </div>
        </div>

        <div className={styles.group_second}>
          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Mã quai:</label>
              <input
                name="Mã quai"
                value={inputForm["Mã quai"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span> Tên quai </span>
            </div>

            <div className={styles.group_second_row__right}>
              <div className={styles.group_second_row__right_pair}>
                <label>Giá trang trí:</label>
                <input
                  name="Giá trang trí"
                  value={inputForm["Giá trang trí"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
              <div className={styles.group_second_row__right_pair}>
                <label className={styles.label_custom}>Giá tân trang:</label>
                <input
                  name="Giá trang trí"
                  value={inputForm["Giá trang trí"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Màu:</label>
              <input
                name="Màu"
                value={inputForm["Màu"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_small}
              />
              <span> Tên màu </span>
            </div>
            <div className={styles.group_second_row__right}>
              <div className={styles.group_second_row__right_pair}>
                <label>Giá sườn:</label>
                <input
                  name="Giá sườn"
                  value={inputForm["Giá sườn"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
              <div className={styles.group_second_row__right_pair}>
                <label className={styles.label_custom}>Nhân công:</label>
                <input
                  name="Nhân công"
                  value={inputForm["Nhân công"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Đơn giá:</label>
              <input
                name="Đơn giá"
                value={inputForm["Đơn giá"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_middle}
              />
            </div>
            <div className={styles.group_second_row__right}>
              <div className={styles.group_second_row__right_pair}>
                <label>Giá gót:</label>
                <input
                  name="Giá gót"
                  value={inputForm["Giá gót"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
              <div className={styles.group_second_row__right_pair}>
                <label className={styles.label_custom}>Giá keo:</label>
                <input
                  name="Giá keo"
                  value={inputForm["Giá keo"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Ghi chú:</label>
              <input
                name="Ghi chú"
                value={inputForm["Ghi chú"]}
                onChange={(e) => handleChangeInformationForm(e)}
                className={styles.item_size_big}
              />
            </div>

            <div
              className={clsx(
                styles.group_second_row__right,
                styles.group_second_row__right_gia_von
              )}
            >
              <div className={styles.group_second_row__right_pair}>
                <label>Giá vốn:</label>
                <input
                  name="Giá vốn"
                  value={inputForm["Giá vốn"]}
                  onChange={(e) => handleChangeInformationForm(e)}
                  className={styles.item_size_small}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.group_third}>
          <div className={styles.group_third_row}>
            <div className={styles.group_third_row_item}>
              <label>Trang trí đế:</label>
              <textarea
                name="Trang trí đế"
                value={inputForm["Trang trí đế"]}
                onChange={(e) => handleChangeInformationForm(e)}
              />
            </div>
            <div className={styles.group_third_row_item}>
              <label>Trang trí quai:</label>
              <textarea
                name="Trang trí quai"
                value={inputForm["Trang trí quai"]}
                onChange={(e) => handleChangeInformationForm(e)}
              />
            </div>
          </div>

          <div className={styles.group_third_row}>
            <div className={styles.group_third_row_item}>
              <label>Ghi chú đế:</label>
              <textarea
                name="Ghi chú đế"
                value={inputForm["Ghi chú đế"]}
                onChange={(e) => handleChangeInformationForm(e)}
              />
            </div>
            <div className={styles.group_third_row_item}>
              <label>Ghi chú quai:</label>
              <textarea
                name="Ghi chú quai"
                value={inputForm["Ghi chú quai"]}
                onChange={(e) => handleChangeInformationForm(e)}
              />
            </div>
          </div>
        </div>

        <div className={styles.group_button}>
          <div>
            <button>Button first</button>
            <button>Second first</button>
          </div>

          <div>
            <button onClick={handleSaveFrom}>Lưu</button>
            <button>Nhập tiếp</button>
            <button>Đóng</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormGiay;
