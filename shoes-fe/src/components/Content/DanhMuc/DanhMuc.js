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
      if (
        userAccess.some((obj) => (obj.MAFORM === "F0007") & (obj.XEM === 2))
      ) {
        return <KhoHang />;
      }
      return <div>Không có quyền truy cập</div>;
    case "Màu":
      return <Mau />;
    case "Mũi":
      return <Mui />;
    case "Sườn":
      return <Suon />;
    case "Đế":
      return <De />;
    case "Gót":
      return <Got />;
    case "Cá":
      return <Ca />;
    case "Quai":
      return <Quai />;
    case "Nhân viên":
      return <NhanVien />;
    case "Kỳ tính lương":
      return <KyTinhLuong />;
    case "Khách hàng":
      return <KhachHang />;
    default:
      alert("Chua xu ly ngoai Giay");
  }
};

export default DanhMuc;
