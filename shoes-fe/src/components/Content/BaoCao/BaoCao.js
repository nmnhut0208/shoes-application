import { useTaskContext } from "~task";

import DonHang from "./DonHang";
import CongNo from "./CongNo";
import BangLuong from "./BangLuong";

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
  }
  return <></>;
};

export default BaoCao;
