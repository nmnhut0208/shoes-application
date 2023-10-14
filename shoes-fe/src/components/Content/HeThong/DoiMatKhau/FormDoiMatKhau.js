import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useUserContext, actions } from "~user";
import { useTaskContext, resetHeader } from "~task";
import { CustomAlert } from "~utils/alert_custom";

function FormDoiMatKhau() {
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // console.log("FormLogin: re-render", stateUser);

  function handleOk() {
    setLoading(true);
    form.validateFields().then((values) => {
      if (values["current-password"] !== stateUser.userPassword) {
        CustomAlert("Mật khẩu hiện tại không đúng");
        setLoading(false);
        return;
      } else if (values["new-password"] !== values["confirm-password"]) {
        CustomAlert("Mật khẩu mới không trùng nhau");
        setLoading(false);
        return;
      } else {
        const send_data = {
          username: stateUser.userName,
          newpassword: values["new-password"],
        };
        fetch("http://localhost:8000/changepassword", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(send_data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            if (data.status === "success") {
              dispatchUser(actions.setUserPassword(values["new-password"]));
              setLoading(false);
              CustomAlert("Đổi mật khẩu thành công");
              resetHeader(dispatchTask);
            } else {
              CustomAlert("Đổi mật khẩu thất bại");
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    });
  }

  return (
    <Form form={form} onFinish={handleOk}>
      <Form.Item
        name="current-password"
        rules={[
          { required: true, message: "Please enter your current password" },
        ]}
      >
        <Input.Password placeholder="Current Password" />
      </Form.Item>
      <Form.Item
        name="new-password"
        rules={[{ required: true, message: "Please enter your new password" }]}
      >
        <Input.Password placeholder="New Password" />
      </Form.Item>
      <Form.Item
        name="confirm-password"
        rules={[
          { required: true, message: "Please enter your new password again" },
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

export default FormDoiMatKhau;
