import { useTaskContext } from "~task";
import { useUserContext } from "~user";
import { DonHang } from "./DonHang";
import { PhanCong } from "./PhanCong";
import { ThuTien } from "./ThuTien";
import { ChamCong } from "./ChamCong";
import { GiaoHang } from "./GiaoHang";
import { CustomAlert } from "~utils/alert_custom";

const NghiepVu = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  const userAccess = stateUser.userPoolAccess;
  switch (inforCurrentTask.infoDetail) {
    case "Đơn hàng":
      return <DonHang />;
    case "Phân công":
      return <PhanCong />;
    case "Thu tiền":
      return <ThuTien />;
    case "Giao hàng":
      if (userAccess.some((obj) => obj.MAFORM === "F0034" && obj.XEM === 1)) {
        return <GiaoHang />;
      } else {
        CustomAlert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    case "Chấm công":
      if (userAccess.some((obj) => obj.MAFORM === "F0043" && obj.XEM === 1)) {
        return <ChamCong />;
      } else {
        CustomAlert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    default:
      CustomAlert("Chức năng này không hợp lệ.");
  }
};

export default NghiepVu;
