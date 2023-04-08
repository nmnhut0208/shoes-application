import clsx from 'clsx'
import { Form, Input, Button } from 'antd';
import styles from "./FormGiay.module.scss"


const FormGiay = ({ record }) => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  var image_url = "https://img.freepik.com/free-vector/cats-doodle-pattern-background_53876-100663.jpg?w=900&t=st=1680945739~exp=1680946339~hmac=0a6288d0cf4d9b1a566b96eeaad8db3beb69fa0729f4ffecfcc866bbfecaf4e2"
  return (
    <div className={clsx(styles.form)}>
      <Form
        initialValues={record}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      // closeIcon={<img style={{ height: '20px', width: '20px' }} 
      // src={"./close-icon.png"}  /> }
      >
        <div className={styles.group_first}>
          <div className={styles.group_first__1}>
            {/* <div className={styles.group_first__1_row}> */}
            <Form.Item
              label="Mã giày"
              name="Mã giày"
            >
              <Input className={styles.item_size_middle} />
            </Form.Item>
            {/* </div> */}

            <Form.Item
              label="Mã tham chiếu"
              name="Mã tham chiếu"
            >
              <Input className={styles.item_size_middle} />
            </Form.Item>

            {/* <div className={styles.group_first__1_row}> */}
            <Form.Item
              label="Tên giày"
              name="Tên giày"
            >
              <Input className={styles.item_size_big} />
            </Form.Item>
            {/* </div> */}

            <Form.Item
              label="Khách hàng"
              name="Khách hàng"
            >
              <Input className={styles.item_size_middle} />
            </Form.Item>

            <div className={styles.group_first__1_row}>
              <Form.Item
                label="Mã đế"
                name="Mã đế"
              >
                <Input />
              </Form.Item>
              <span className={styles.form_context_span}> Tên đế </span>
            </div>

            <div className={styles.group_first__1_row}>
              <Form.Item
                label="Mã sườn"
                name="Mã sườn"
              >
                <Input />

              </Form.Item>
              <span className={styles.form_context_span}> Tên sườn </span>
            </div>

            <div className={styles.group_first__1_row}>
              <Form.Item
                label="Mã cá"
                name="Mã cá"
              >
                <Input />

              </Form.Item>
              <span className={styles.form_context_span}> Tên cá </span>
            </div>
          </div>

          <div className={styles.group_first__2}>
            <div className={styles.group_first__2_image}>
              <div className={styles.group_first__2_image_container}>
                <img 
                  // src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                src = {image_url}
                />
              </div>
              <Button>Chọn hình ảnh</Button>
            </div>
          </div>
        </div>


        <div className={styles.group_second}>
          <div className={styles.group_second_row}>

            <div className={styles.group_second_row__1}>
              <Form.Item
                label="Mã quai"
                name="Mã quai"
              >
                <Input />
              </Form.Item>
              <span className={styles.form_context_span}> Tên quai </span>
            </div>

            <div className={styles.group_second_row__2}>
              <Form.Item
                label="Giá trang trí"
                name="Giá trang trí"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Giá tân trang"
                name="Giá tân trang"
              >
                <Input />
              </Form.Item>
            </div>


          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__1}>
              <Form.Item
                label="Màu"
                name="Màu"
              >
                <Input />

              </Form.Item>
              <span className={styles.form_context_span}> Tên màu </span>
            </div>
            <div className={styles.group_second_row__2}>
              <Form.Item
                label="Giá sườn"
                name="Giá sườn"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Nhân công"
                name="Nhân công"
              >
                <Input />
              </Form.Item>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__1}>
              <Form.Item
                label="Đơn giá"
                name="Đơn giá"
              >
                <Input className={styles.item_size_middle} />
              </Form.Item>

            </div>
            <div className={styles.group_second_row__2}>
              <Form.Item
                label="Giá gót"
                name="Giá gót"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Giá keo"
                name="Giá keo"
              >
                <Input />
              </Form.Item>
            </div>

          </div>

          <div className={styles.group_second_row}>

            <div className={styles.group_second_row__1}>
              <Form.Item
                label="Ghi chú"
                name="Ghi chú"
              >
                <Input className={styles.item_size_big} />
              </Form.Item>
            </div>

            <div className={clsx(styles.group_second_row__2,
              styles.group_second_row__2_gia_von)}>
              <Form.Item
                label="Giá vốn"
                name="Giá vốn"
              >
                <Input className={styles.item_size_small} />
              </Form.Item>
            </div>

          </div>

        </div>

        <div className={styles.group_third}>
          <div className={styles.group_third_row}>
            <Form.Item
              label="Trang trí đế"
              name="Trang trí đế"
            >
              <textarea />
            </Form.Item>

            <Form.Item
              label="Trang trí quai"
              name="Trang trí quai"
            >
              <textarea />
            </Form.Item>
          </div>

          <div className={styles.group_third_row}>
            <Form.Item
              label="Ghi chú đế"
              name="Ghi chú đế"
            >
              <textarea />
            </Form.Item>

            <Form.Item
              label="Ghi chú quai"
              name="Ghi chú quai"
            >
              <textarea />
            </Form.Item>
          </div>

        </div>



        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>

  );
};


export default FormGiay

