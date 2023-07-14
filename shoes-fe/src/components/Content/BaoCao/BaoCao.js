import { useTaskContext } from "~task";

import DonHang from "./DonHang";
import CongNo from "./CongNo";

const BaoCao = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  switch (inforCurrentTask.infoDetail) {
    case "Đơn hàng":
      return <DonHang />;
    case "Công nợ":
      return <CongNo />;
  }
  return <></>;
};

export default BaoCao;
