import { useTaskContext } from "~task";
import { useUserContext } from "~user";
import { DonHang } from "./DonHang";
import { PhanCong } from "./PhanCong";
import ChiTien from "./ChiTien";
import GiaoHang from "./GiaoHang";
import ChamCong from "./ChamCong";

const NghiepVu = () => {
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
    case "Chi tiền":
      return <ChiTien />;
    case "Giao hàng":
      if (userAccess.some((obj) => obj.MAFORM === "F0034" && obj.XEM === 1)) {
        return <GiaoHang />;
      } else {
        alert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    case "Chấm công":
      if (userAccess.some((obj) => obj.MAFORM === "F0034" && obj.XEM === 1)) {
        return <ChamCong />;
      } else {
        alert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    default:
      alert("Chua xu ly ngoai DonHang");
  }
};

export default NghiepVu;
