import clsx from 'clsx'
// import { Form, Input, Button } from 'antd';
import styles from "./FormGiay.module.scss"


const FormGiay = ({ record }) => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // var image_url = "https://img.freepik.com/free-vector/cats-doodle-pattern-background_53876-100663.jpg?w=900&t=st=1680945739~exp=1680946339~hmac=0a6288d0cf4d9b1a566b96eeaad8db3beb69fa0729f4ffecfcc866bbfecaf4e2"
  var image_url = "https://images.unsplash.com/photo-1589816365021-a76a9422f6a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  return (
    <div className={clsx(styles.form)}>
      <form
      // initialValues={record}
      // name="basic"
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      >
        <div className={styles.group_first}>
          <div className={styles.group_first__1}>
            <div className={styles.group_first__1_row}>
              <label
                label="Mã giày"
                name="Mã giày"
              >
                Mã giày:
              </label>
              <input className={styles.item_size_middle} />
            </div>
            <div className={styles.group_first__1_row}>
              <label
                label="Mã tham chiếu"
                name="Mã tham chiếu"
              >
                Mã tham chiếu:
              </label>
              <input className={styles.item_size_middle} />

            </div>

            <div className={styles.group_first__1_row}>
              <label
                label="Tên giày"
                name="Tên giày"
              >
                Tên giày:
              </label>
              <input className={styles.item_size_big} />
            </div>
            <div className={styles.group_first__1_row}>

              <label
                label="Khách hàng"
                name="Khách hàng"
              >
                Khách hàng:
              </label>
              <input className={styles.item_size_small} />
            </div>

            <div className={styles.group_first__1_row}>
              <label
                label="Mã đế"
                name="Mã đế"
              >
                Mã đế:
              </label>
              <input className={styles.item_size_small} />
              <span className={styles.form_context_span}> Tên đế </span>
            </div>

            <div className={styles.group_first__1_row}>
              <label
                label="Mã sườn"
                name="Mã sườn"
              >Mã sườn:
              </label>
              <input className={styles.item_size_small} />
              <span className={styles.form_context_span}> Tên sườn </span>
            </div>

            <div className={styles.group_first__1_row}>
              <label
                label="Mã cá"
                name="Mã cá"
              >Mã cá:
              </label>
              <input className={styles.item_size_small} />
              <span className={styles.form_context_span}> Tên cá </span>
            </div>
          </div>

          <div className={styles.group_first__2}>
            <div className={styles.group_first__2_image}>
              <div className={styles.group_first__2_image_container}>
                <img
                  // src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  src={image_url}
                />
              </div>
              <button>Chọn hình ảnh</button>
            </div>
          </div>
        </div>


        <div className={styles.group_second}>
          <div className={styles.group_second_row}>

            <div className={styles.group_second_row__1}>
              <label
                label="Mã quai"
                name="Mã quai"
              >Mã quai:
              </label>
              <input className={styles.item_size_small} />
              <span className={styles.form_context_span}> Tên quai </span>
            </div>

            <div className={styles.group_second_row__2}>
              <div className={styles.group_second_row__2_pair}>

                <label
                  label="Giá trang trí"
                  name="Giá trang trí"
                >Giá trang trí:
                </label>
                <input />
              </div>
              <div className={styles.group_second_row__2_pair}>

                <label className={styles.label_custom}
                  label="Giá tân trang"
                  name="Giá tân trang"
                >Giá tân trang:
                </label>
                <input />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__1}>
              <label
                label="Màu"
                name="Màu"
              >
                Màu:
              </label>
              <input className={styles.item_size_small} />
              <span className={styles.form_context_span}> Tên màu </span>
            </div>
            <div className={styles.group_second_row__2}>
              <div className={styles.group_second_row__2_pair}>

                <label
                  label="Giá sườn"
                  name="Giá sườn"
                >Giá sườn:
                </label>
                <input />
              </div>
              <div className={styles.group_second_row__2_pair}>

                <label className={styles.label_custom}
                  label="Nhân công"
                  name="Nhân công"
                >Nhân công:
                </label>
                <input />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__1}>
              <label
                label="Đơn giá"
                name="Đơn giá"
              >Đơn giá:
              </label>
              <input className={styles.item_size_middle} />

            </div>
            <div className={styles.group_second_row__2}>
              <div className={styles.group_second_row__2_pair}>
                <label
                  label="Giá gót"
                  name="Giá gót"
                >Giá gót:
                </label>
                <input />
              </div>
              <div className={styles.group_second_row__2_pair}>
                <label className={styles.label_custom}
                  label="Giá keo"
                  name="Giá keo"
                >Giá keo:
                </label>
                <input />
              </div>
            </div>

          </div>

          <div className={styles.group_second_row}>

            <div className={styles.group_second_row__1}>
              <label
                label="Ghi chú"
                name="Ghi chú"
              >Ghi chú:
              </label>
              <input className={styles.item_size_big} />
            </div>

            <div className={clsx(styles.group_second_row__2,
              styles.group_second_row__2_gia_von)}>
              <div className={styles.group_second_row__2_pair}>

                <label
                  label="Giá vốn"
                  name="Giá vốn"
                >Giá vốn:
                </label>
                <input className={styles.item_size_small} />
              </div>
            </div>

          </div>

        </div>

        <div className={styles.group_third}>
          <div className={styles.group_third_row}>
            <div className={styles.group_third_row_item}>
              <label
                label="Trang trí đế"
                name="Trang trí đế"
              >Trang trí đế:
              </label>
              <textarea />
            </div>
            <div className={styles.group_third_row_item}>
              <label
                label="Trang trí quai"
                name="Trang trí quai"
              >Trang trí quai:
              </label>
              <textarea />
            </div>
          </div>

          <div className={styles.group_third_row}>
            <div className={styles.group_third_row_item}>
              <label
                label="Ghi chú đế"
                name="Ghi chú đế"
              >Ghi chú đế:
              </label>
              <textarea />
            </div>
            <div className={styles.group_third_row_item}>
              <label
                label="Ghi chú quai"
                name="Ghi chú quai"
              >Ghi chú quai:
              </label>
              <textarea />
            </div>
          </div>

        </div>

        <label>
          <button type="primary" htmlType="submit">
            Submit
          </button>
        </label>
      </form>
    </div>

  );
};


export default FormGiay

