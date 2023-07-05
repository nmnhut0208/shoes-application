import { useTaskContext } from "~task";
import HeThong from "./HeThong";
import DanhMuc from "./DanhMuc";
import NghiepVu from "./NghiepVu";
import TruyVan from "./TruyVan/";
import BaoCao from "./BaoCao";

const Content = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  console.log("inforCurrentTask", inforCurrentTask.infoContent);
  switch (inforCurrentTask.infoContent) {
    case "Header":
      return <></>;
    case "Hệ thống":
      return <HeThong />;
    case "Danh mục":
      return <DanhMuc />;
    case "Nghiệp vụ":
      return <NghiepVu />;
    case "Truy vấn":
      return <TruyVan />;
    case "Báo cáo":
      return <BaoCao />;
    default:
      alert("Chua xu ly ngoai Danh Muc");
  }
};

export default Content;
