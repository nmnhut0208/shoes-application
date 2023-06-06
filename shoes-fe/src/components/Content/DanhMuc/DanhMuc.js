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
  switch (inforCurrentTask.infoDetail) {
    case "Giày":
      return <Giay />;
    case "Kho hàng":
      if (userAccess.some((obj) => obj.MAFORM === "F0007" && obj.XEM === 1)) {
        return <KhoHang />;
      } else {
        alert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    case "Màu":
      return <Mau />;
    case "Mũi":
      if (userAccess.some((obj) => obj.MAFORM === "F0011" && obj.XEM === 1)) {
        return <Mui />;
      } else {
        alert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    case "Sườn":
      return <Suon />;
    case "Đế":
      if (userAccess.some((obj) => obj.MAFORM === "F0015" && obj.XEM === 1)) {
        return <De />;
      } else {
        alert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    case "Gót":
      return <Got />;
    case "Cá":
      if (userAccess.some((obj) => obj.MAFORM === "F0022" && obj.XEM === 1)) {
        return <Ca />;
      } else {
        alert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    case "Quai":
      return <Quai />;
    case "Nhân viên":
      if (userAccess.some((obj) => obj.MAFORM === "F0002" && obj.XEM === 1)) {
        return <NhanVien />;
      } else {
        alert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    case "Kỳ tính lương":
      if (userAccess.some((obj) => obj.MAFORM === "F0040" && obj.XEM === 1)) {
        return <KyTinhLuong />;
      } else {
        alert("Bạn không có quyền truy cập vào chức năng này!");
        return <></>;
      }
    case "Khách hàng":
      return <KhachHang />;
    default:
      alert("Chua xu ly ngoai Giay");
  }
};

export default DanhMuc;
