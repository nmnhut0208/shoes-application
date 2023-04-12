import { useTaskContext } from "@task";
import Giay from "./HangHoa/Giay";

const DanhMuc = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  switch (inforCurrentTask.infoDetail) {
    case "Giày":
      return <Giay></Giay>;
    default:
      alert("Chua xu ly ngoai Giay");
  }
};

export default DanhMuc;
