import { useTaskContext } from "~task";
import { Giay, KhoHang, Mau, Mui, Suon, De, Got, Ca, Quai } from "./HangHoa";
import NhanVien from "./NhanVien";
import KyTinhLuong from "./KyTinhLuong";
import KhachHang from "./KhachHang";
import { useUserContext } from "~user";

const DanhMuc = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  const userAccess = stateUser.userPoolAccess;
  console.log("inforCurrentTask.infoDetail: ", inforCurrentTask.infoDetail);
  switch (inforCurrentTask.infoDetail) {
    case "Giày":
      if (userAccess.some((obj) => obj.MAFORM === "F0024" && obj.XEM === 1))
        return <Giay />;
      break;
    case "Kho hàng":
      if (userAccess.some((obj) => obj.MAFORM === "F0007" && obj.XEM === 1))
        return <KhoHang />;
      break;
    case "Màu":
      if (userAccess.some((obj) => obj.MAFORM === "F0009" && obj.XEM === 1))
        return <Mau />;
      break;
    case "Mũi":
      if (userAccess.some((obj) => obj.MAFORM === "F0011" && obj.XEM === 1))
        return <Mui />;
      break;
    case "Sườn":
      if (userAccess.some((obj) => obj.MAFORM === "F0020" && obj.XEM === 1))
        return <Suon />;
      break;
    case "Đế":
      if (userAccess.some((obj) => obj.MAFORM === "F0015" && obj.XEM === 1))
        return <De />;
      break;
    case "Gót":
      if (userAccess.some((obj) => obj.MAFORM === "F0013" && obj.XEM === 1))
        return <Got />;
      break;
    case "Cá":
      if (userAccess.some((obj) => obj.MAFORM === "F0022" && obj.XEM === 1))
        return <Ca />;
      break;
    case "Quai":
      if (userAccess.some((obj) => obj.MAFORM === "F0018" && obj.XEM === 1))
        return <Quai />;
      break;
    case "Nhân viên":
      if (userAccess.some((obj) => obj.MAFORM === "F0002" && obj.XEM === 1))
        return <NhanVien />;
      break;
    case "Kỳ tính lương":
      if (userAccess.some((obj) => obj.MAFORM === "F0040" && obj.XEM === 1))
        return <KyTinhLuong />;
      break;
    case "Khách hàng":
      if (userAccess.some((obj) => obj.MAFORM === "F0004" && obj.XEM === 1))
        return <KhachHang />;
      break;
  }
  alert("Bạn không có quyền truy cập vào chức năng này!");
  return <></>;
};

export default DanhMuc;
