import { useTaskContext } from "~task";
import { useUserContext } from "~user";
import { DonHang } from "./DonHang";
import { PhanCong } from "./PhanCong";
import { GiaoHang } from "./GiaoHang";
import ThuTien from "./ThuTien";
import { ChamCong } from "./ChamCong";
import { CustomAlert } from "~utils/alert_custom";

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
        CustomAlert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    case "Thu tiền":
      return <ThuTien />;
    case "Chấm công":
      if (userAccess.some((obj) => obj.MAFORM === "F0042" && obj.XEM === 1)) {
        return <ChamCong />;
      } else {
        CustomAlert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    default:
      CustomAlert("Chua xu ly ngoai TruyVan");
  }
};

export default TruyVan;
