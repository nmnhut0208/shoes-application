import { useTaskContext } from "~task";
import { useUserContext } from "~user";

import DonHang from "./DonHang";
import CongNo from "./CongNo";
import BangLuong from "./BangLuong";
import DonHangMau from "./DonHangMau";
import { CustomAlert } from "~utils/alert_custom";

const BaoCao = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  const userAccess = stateUser.userPoolAccess;
  switch (inforCurrentTask.infoDetail) {
    case "Đơn hàng":
      return <DonHang />;
    case "Công nợ":
      if (userAccess.some((obj) => obj.MAFORM === "F0046" && obj.XEM === 1)) {
        return <CongNo />;
      } else {
        CustomAlert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    case "Bảng lương":
      return <BangLuong />;
    case "Đơn hàng mẫu":
      return <DonHangMau />;
  }
  return <></>;
};

export default BaoCao;
