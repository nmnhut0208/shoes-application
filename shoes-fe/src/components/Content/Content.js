import { useTaskContext } from "@task";
import DanhMuc from "./DanhMuc";

const Content = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  switch (inforCurrentTask.infoContent) {
    case "Header":
      return <></>;
    case "DanhMuc":
      return <DanhMuc></DanhMuc>;
    default:
      alert("Chua xu ly ngoai Danh Muc");
  }
};

export default Content;
