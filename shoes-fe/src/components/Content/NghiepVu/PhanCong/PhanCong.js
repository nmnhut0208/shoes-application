import { useState, useMemo } from "react";
import Modal from "./Modal";
import FormNghiepVuPhanCong from "./FormNghiepVuPhanCong";
import { useUserContext } from "~user";

const MAFORM_NGHIEPVU_PHANCONG = "F0037";

const PhanCong = () => {
  const [isSaveData, setIsSaveData] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [stateUser, dispatchUser] = useUserContext();

  const permission = useMemo(() => {
    console.log("stateUser.userPoolAccess ", stateUser.userPoolAccess);
    const phanquyen = stateUser.userPoolAccess.filter(
      (obj) => obj.MAFORM === MAFORM_NGHIEPVU_PHANCONG
    )[0];
    console.log("phanquyen: ", phanquyen);
    return phanquyen;
  }, []);
  if (permission.THEM === 0) {
    alert(stateUser.userName + " không có quyền Phân Công");
    return null;
  }
  // Việc xem, xóa, sửa đơn hàng sẽ từ bên truy vấn => đơn hàng
  // Nghiệp Vụ Đơn Hàng chỉ để tạo mới đơn hàng thôi
  return (
    <Modal
      status={showModal}
      title="Phân Công - F0037"
      setShowModal={setShowModal}
      isSaveData={isSaveData}
    >
      <FormNghiepVuPhanCong
        setShowModalNghiepVuPhanCong={setShowModal}
        setIsSaveDataNghiepVuPhanCong={setIsSaveData}
        permission={permission}
      />
    </Modal>
  );
};
export default PhanCong;
