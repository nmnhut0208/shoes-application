import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useUserContext, actions } from "~user";
import { useTaskContext, resetHeader } from "~task";

function FormDangKy() {
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // console.log("FormLogin: re-render", stateUser);

  function handleOk() {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        // TODO: Implement login logic
        // if (values.username === "nhutnm4" && values.password === "123456") {
        //   dispatchUser(actions.setUserName("nhutnm4"));
        //   dispatchUser(actions.setUserPassword("123456"));
        //   resetHeader(dispatchTask);
        // }
        const send_data = {
          username: values.username,
        };
        fetch("http://localhost:8000/existuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(send_data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            if (data.exist) {
              alert("Tên người dùng đã tồn tại, Xin vui lòng chọn tên khác!");
              setLoading(false);
            } else if (values["password"] !== values["confirm-password"]) {
              alert("Mật khẩu không trùng nhau");
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
                  console.log("data", data);
                  if (data.status === "success") {
                    // dispatchUser(actions.setUserName(values.username));
                    // dispatchUser(actions.setUserPassword(values.password));
                    setLoading(false);
                    alert("Đăng ký thành công");
                    resetHeader(dispatchTask);
                  } else {
                    alert("Đăng ký thất bại");
                    setLoading(false);
                  }
                })
                .catch((error) => {
                  console.log("error", error);
                });
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  return (
    <Form form={form} onFinish={handleOk}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please enter your username" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirm-password"
        rules={[
          { required: true, message: "Please enter your password again" },
        ]}
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
