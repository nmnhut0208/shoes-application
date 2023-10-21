import { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { useUserContext, actions } from "~user";
import { useTaskContext, resetHeader } from "~task";
import { CustomAlert } from "~utils/alert_custom";

function FormDangKy() {
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [nhanvien, setNhanVien] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/nhanvien_null")
      .then((response) => response.json())
      .then((info) => {
        setNhanVien(info);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleOk(values) {
    setLoading(true);

    if (values.password !== values.confirmPassword) {
      CustomAlert("Mật khẩu không trùng nhau");
      setLoading(false);
    } else {
      const send_data = {
        username: values.username,
        password: values.password,
      };

      fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(send_data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setLoading(false);
            CustomAlert("Đăng ký thành công");
            resetHeader(dispatchTask);
          } else {
            CustomAlert("Đăng ký thất bại");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <Form form={form} onFinish={handleOk}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please enter your username" }]}
      >
        <Select placeholder="Chọn Nhân Viên">
          {nhanvien.map((nv) => (
            <Select.Option key={nv["MANVIEN"]} value={nv["MANVIEN"]}>
              {nv["TENNVIEN"]}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: "Please confirm your password" }]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormDangKy;
