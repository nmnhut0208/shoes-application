import { useTaskContext } from "~task";
import DonHang from "./DonHang";

const NghiepVu = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  console.log(inforCurrentTask);
  switch (inforCurrentTask.infoDetail) {
    case "Đơn hàng":
      return <DonHang />;
    default:
      alert("Chua xu ly ngoai DonHang");
  }
};

export default NghiepVu;
