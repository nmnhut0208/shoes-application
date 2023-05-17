import { useTaskContext } from "~task";
import GiaoHang from "./GiaoHang";
import ThuChi from "./ThuChi";

const TruyVan = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  console.log(inforCurrentTask);
  switch (inforCurrentTask.infoDetail) {
    case "Giao hàng":
      return <GiaoHang />;
    case "Thu chi":
      return <ThuChi />;
    default:
      alert("Chua xu ly ngoai TruyVan");
  }
};

export default TruyVan;
