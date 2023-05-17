import { useTaskContext } from "~task";
import DanhMuc from "./DanhMuc";
import NghiepVu from "./NghiepVu";
import TruyVan from "./TruyVan/";

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
      return <TruyVan />;
    case "Báo cáo":
      return alert("Báo cáo");
    default:
      alert("Chua xu ly ngoai Danh Muc");
  }
};

export default Content;
