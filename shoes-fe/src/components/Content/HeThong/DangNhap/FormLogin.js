import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useUserContext, actions } from "~user";
import { useTaskContext, resetHeader } from "~task";
import { CustomAlert } from "~utils/alert_custom";

function FormLogin() {
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
        fetch("http://localhost:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.exist) {
              dispatchUser(actions.setUserName(values.username));
              dispatchUser(actions.setUserPassword(values.password));
              fetch("http://localhost:8000/access", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: values.username }),
              })
                .then((response) => response.json())
                .then((data) => {
                  dispatchUser(actions.setPoolUserAccess(data));
                  setLoading(false);
                  dispatchUser(actions.setIsLogin(false));
                })
                .catch((error) => {
                  console.log("error", error);
                });
              resetHeader(dispatchTask);
            } else {
              CustomAlert("Thông tin đăng nhập chưa chính xác!");
              setLoading(false);
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
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormLogin;
