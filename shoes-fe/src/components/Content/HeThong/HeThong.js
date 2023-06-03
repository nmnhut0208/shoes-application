import { useTaskContext } from "~task";
import DangNhap from "./DangNhap";

const HeThong = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  switch (inforCurrentTask.infoDetail) {
    case "Đăng nhập":
      return <DangNhap />;
    default:
      alert("Chua xu ly ngoai Giay");
  }
};

export default HeThong;
