import { useTaskContext } from "~task";

import DonHang from "./DonHang";
import CongNo from "./CongNo";
import BangLuong from "./BangLuong";
import DonHangMau from "./DonHangMau";

const BaoCao = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  switch (inforCurrentTask.infoDetail) {
    case "Đơn hàng":
      return <DonHang />;
    case "Công nợ":
      return <CongNo />;
    case "Bảng lương":
      return <BangLuong />;
    case "Đơn hàng mẫu":
      return <DonHangMau />;
  }
  return <></>;
};

export default BaoCao;
