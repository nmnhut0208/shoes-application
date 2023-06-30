import { useState, useMemo } from "react";
import Modal from "./Modal";
import { FormDonHang } from "./components";
import { useUserContext } from "~user";

const MAFORM_DONHANG = "F0032";

const DonHang = () => {
  const [isSaveData, setIsSaveData] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [stateUser, dispatchUser] = useUserContext();

  const permission = useMemo(() => {
    console.log("stateUser.userPoolAccess ", stateUser.userPoolAccess);
    const phanquyen = stateUser.userPoolAccess.filter(
      (obj) => obj.MAFORM === MAFORM_DONHANG
    )[0];
    console.log("phanquyen: ", phanquyen);
    return phanquyen;
  }, []);
  if (permission.THEM === 0) {
    alert(stateUser.userName + " không có quyền thêm Đơn hàng");
    return null;
  }
  // Việc xem, xóa, sửa đơn hàng sẽ từ bên truy vấn => đơn hàng
  // Nghiệp Vụ Đơn Hàng chỉ để tạo mới đơn hàng thôi
  return (
    <Modal
      status={showModal}
      title="Đơn hàng - F0032"
      setShowModal={setShowModal}
      isSaveData={isSaveData}
      isResetPageEmpty={true}
    >
      <FormDonHang
        setShowModalNghiepVuDonHang={setShowModal}
        setIsSaveDataNghiepVuDonHang={setIsSaveData}
        permission={permission}
      />
    </Modal>
  );
};
export default DonHang;
