import { useTaskContext } from "~task";

import DonHang from "./DonHang";

const BaoCao = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  switch (inforCurrentTask.infoDetail) {
    case "Đơn hàng":
      return <DonHang />;
  }
  return <></>;
};

export default BaoCao;
