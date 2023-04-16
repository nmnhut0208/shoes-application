import { useTaskContext } from "~task";
import { Giay, KhoHang, Mau, Mui, Suon, De, Got, Ca, Quai } from "./HangHoa";

const DanhMuc = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  switch (inforCurrentTask.infoDetail) {
    case "Giày":
      return <Giay />;
    case "Kho hàng":
      return <KhoHang />;
    case "Màu":
      return <Mau />;
    case "Mũi":
      return <Mui />;
    case "Sườn":
      return <Suon />;
    case "Đế":
      return <De />;
    case "Gót":
      return <Got />;
    case "Cá":
      return <Ca />;
    case "Quai":
      return <Quai />;
    default:
      alert("Chua xu ly ngoai Giay");
  }
};

export default DanhMuc;
