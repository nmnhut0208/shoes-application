import { useState, useMemo } from "react";
import GiaoHangSub from "./GiaoHangSub";
import { useUserContext } from "~user";

const MAFORM_GIAOHANG = "F0033";

const GiaoHang = () => {
  const [isSaveData, setIsSaveData] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [stateUser, dispatchUser] = useUserContext();

  const permission = useMemo(() => {
    const phanquyen = stateUser.userPoolAccess.filter(
      (obj) => obj.MAFORM === MAFORM_GIAOHANG
    )[0];
    return phanquyen;
  }, []);
  // if (permission.THEM === 0) {
  //   CustomAlert(stateUser.userName + " không có quyền thêm Giao Hàng");
  //   return null;
  // }
  // Việc xem, xóa, sửa đơn hàng sẽ từ bên truy vấn => đơn hàng
  // Nghiệp Vụ Đơn Hàng chỉ để tạo mới đơn hàng thôi
  return (
    <div style={{ width: "88%", marginLeft: "5%" }}>
      <GiaoHangSub
        // setShowModalNghiepVuGiaoHang={setShowModal}
        isSaveData={isSaveData}
        setIsSaveDataTruyVanGiaoHang={setIsSaveData}
        permission={permission}
      />
    </div>
  );
};
export default GiaoHang;
