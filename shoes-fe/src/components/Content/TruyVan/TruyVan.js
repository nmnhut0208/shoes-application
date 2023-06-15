import { useTaskContext } from "~task";
import { DonHang } from "./DonHang";
import { PhanCong } from "./PhanCong";
import GiaoHang from "./GiaoHang";
import ThuChi from "./ThuChi";
import ChamCong from "./ChamCong";

const TruyVan = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  console.log(inforCurrentTask);
  switch (inforCurrentTask.infoDetail) {
    case "Đơn hàng":
      return <DonHang />;
    case "Phân công":
      return <PhanCong />;
    case "Giao hàng":
      return <GiaoHang />;
    case "Thu chi":
      return <ThuChi />;
    case "Chấm công":
      return <ChamCong />;
    default:
      alert("Chua xu ly ngoai TruyVan");
  }
};

export default TruyVan;
