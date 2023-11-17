import { useState, useMemo } from "react";
import Modal from "./Modal";
import FormGiaoHang from "./FormGiaoHang";
import { useUserContext } from "~user";
import { CustomAlert } from "~utils/alert_custom";

const MAFORM_GIAOHANG = "F0034";

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
    <Modal
      status={showModal}
      title="Giao Hàng - F0034"
      setShowModal={setShowModal}
      isSaveData={isSaveData}
      isResetPageEmpty={true}
    >
      <FormGiaoHang
        // setShowModalNghiepVuGiaoHang={setShowModal}
        isSaveData={isSaveData}
        setIsSaveDataNghiepVuGiaoHang={setIsSaveData}
        permission={permission}
      />
    </Modal>
  );
};
export default GiaoHang;
