import { useTaskContext } from "~task";
import { useUserContext } from "~user";
import DangNhap from "./DangNhap";
import PhanQuyen from "./PhanQuyen";
import DoiMatKhau from "./DoiMatKhau";
import DangKy from "./DangKy";
import Thoat from "./Thoat";
import { CustomAlert } from "~utils/alert_custom";

const HeThong = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  switch (inforCurrentTask.infoDetail) {
    // case "Đăng nhập":
    //   return <DangNhap />;
    case "Phân quyền":
      if (stateUser.userName === "ADMIN") {
        return <PhanQuyen />;
      } else {
        CustomAlert("Bạn không có quyền truy cập vào chức năng này");
        return <></>;
      }
    case "Đăng ký":
      if (stateUser.userName === "ADMIN") {
        return <DangKy />;
      } else {
        CustomAlert("Bạn không có quyền truy cập vào chức năng này");
        return <></>;
      }
    case "Đổi mật khẩu":
      return <DoiMatKhau />;
    case "Thoát":
      return <Thoat />;
    default:
      CustomAlert("Chức năng không hợp lệ.");
  }
};

export default HeThong;
