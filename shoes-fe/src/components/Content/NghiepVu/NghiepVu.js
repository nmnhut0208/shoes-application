import { useTaskContext } from "~task";
import DonHang from "./DonHang";
import ChiTien from "./ChiTien";
import GiaoHang from "./GiaoHang";

const NghiepVu = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  console.log(inforCurrentTask);
  switch (inforCurrentTask.infoDetail) {
    case "Đơn hàng":
      return <DonHang />;
    case "Chi tiền":
      return <ChiTien />;
    case "Giao hàng":
      return <GiaoHang />;
    default:
      alert("Chua xu ly ngoai DonHang");
  }
};

export default NghiepVu;
