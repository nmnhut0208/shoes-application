import { useState, useMemo } from "react";
import Modal from "./Modal";
import ChamCongSub from "./ChamCongSub";
import { useUserContext } from "~user";
import { CustomAlert } from "~utils/alert_custom";

const MAFORM_CHAMCONG = "F0042";

const ChamCong = () => {
  const [isSaveData, setIsSaveData] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [stateUser, dispatchUser] = useUserContext();

  const permission = useMemo(() => {
    const phanquyen = stateUser.userPoolAccess.filter(
      (obj) => obj.MAFORM === MAFORM_CHAMCONG
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
      <ChamCongSub
        // setShowModalNghiepVuGiaoHang={setShowModal}
        setIsSaveDataNghiepVuGiaoHang={setIsSaveData}
        permission={permission}
      />
    </div>
  );
};
export default ChamCong;
