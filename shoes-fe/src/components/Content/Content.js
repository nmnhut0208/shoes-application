import { useTaskContext } from "~task";
import DanhMuc from "./DanhMuc";
import NghiepVu from "./NghiepVu";

const Content = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  console.log("inforCurrentTask", inforCurrentTask.infoContent);
  switch (inforCurrentTask.infoContent) {
    case "Header":
      return <></>;
    case "Danh mục":
      return <DanhMuc />;
    case "Nghiệp vụ":
      return <NghiepVu />;
    case "Truy vấn":
      return alert("Truy vấn thông tin");
    case "Báo cáo":
      return alert("Báo cáo");
    default:
      alert("Chua xu ly ngoai Danh Muc");
  }
};

export default Content;
