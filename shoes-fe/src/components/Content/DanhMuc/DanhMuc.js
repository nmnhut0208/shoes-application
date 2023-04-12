import { useTaskContext } from "@task";
import { Giay, Mau, Suon, Got, Quai } from "./HangHoa";

const DanhMuc = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  switch (inforCurrentTask.infoDetail) {
    case "Giày":
      return <Giay />;
    case "Màu":
      return <Mau />;
    case "Sườn":
      return <Suon />;
    case "Gót":
      return <Got />;
    case "Quai":
        return <Quai />;
    default:
      alert("Chua xu ly ngoai Giay");
  }
};

export default DanhMuc;
