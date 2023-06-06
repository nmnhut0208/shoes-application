import { useTaskContext } from "~task";
import { useUserContext } from "~user";
import DangNhap from "./DangNhap";
import PhanQuyen from "./PhanQuyen";
import DoiMatKhau from "./DoiMatKhau";

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
        alert("Bạn không có quyền truy cập vào chức năng này");
        return <></>;
      }
    case "Đổi mật khẩu":
      return <DoiMatKhau />;
    default:
      alert("Chua xu ly ngoai Giay");
  }
};

export default HeThong;
