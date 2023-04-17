import { useTaskContext } from "~task";
// import NhapKho from "./NhapKho";

const NghiepVu = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  switch (inforCurrentTask.infoDetail) {
    case "Nhập kho":
      // return <NhapKho />;
      return <></>;
    default:
      alert("Chua xu ly ngoai NhapKho");
  }
};

export default NghiepVu;
