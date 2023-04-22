import { useTaskContext } from "~task";
import DonHang from "./DonHang";
import PhanCong from "./PhanCong/";

const NghiepVu = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  console.log(inforCurrentTask);
  switch (inforCurrentTask.infoDetail) {
    case "Đơn hàng":
      return <DonHang />;
    case "Phân công":
      return <PhanCong />;
    default:
      alert("Chua xu ly ngoai DonHang");
  }
};

export default NghiepVu;
