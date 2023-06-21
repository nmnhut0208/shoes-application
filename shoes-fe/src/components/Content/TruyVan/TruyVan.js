import { useTaskContext } from "~task";
import { useUserContext } from "~user";
import { DonHang } from "./DonHang";
import { PhanCong } from "./PhanCong";
import GiaoHang from "./GiaoHang";
import ThuChi from "./ThuChi";
import ChamCong from "./ChamCong";

const TruyVan = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  const userAccess = stateUser.userPoolAccess;
  console.log(inforCurrentTask);
  switch (inforCurrentTask.infoDetail) {
    case "Đơn hàng":
      return <DonHang />;
    case "Phân công":
      return <PhanCong />;
    case "Giao hàng":
      if (userAccess.some((obj) => obj.MAFORM === "F0033" && obj.XEM === 1)) {
        return <GiaoHang />;
      } else {
        alert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    case "Thu chi":
      return <ThuChi />;
    case "Chấm công":
      if (userAccess.some((obj) => obj.MAFORM === "F0042" && obj.XEM === 1)) {
        return <ChamCong />;
      } else {
        alert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    default:
      alert("Chua xu ly ngoai TruyVan");
  }
};

export default TruyVan;
