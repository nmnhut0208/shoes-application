import { useState, useMemo } from "react";
import Modal from "./Modal";
import FormNghiepVuPhanCong from "./FormNghiepVuPhanCong";
import { useUserContext } from "~user";
import { CustomAlert } from "~utils/alert_custom";

const MAFORM_NGHIEPVU_PHANCONG = "F0037";

const PhanCong = () => {
  const [isSaveData, setIsSaveData] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [stateUser, dispatchUser] = useUserContext();

  // Lưu lại những mà dòng được Add bằng button Thêm
  // Nhưng chưa được lưu database bởi button Save
  // Những dòng này là thông tin tạm thời
  // (hiện vẫn được lưu xuống database để làm logic xóa bằng button Xóa, Sửa cho dễ dàng)
  // Tuy nhiêu, nếu người dùng ko muốn lưu lại thì phải xóa những dòng này đi
  const [
    listMaDongPhanCongAddButWaitSave,
    setListMaDongPhanCongAddButWaitSave,
  ] = useState([]);

  const [dataDeleteButWaitSave, setDataDeleteButWaitSave] = useState([]);

  const permission = useMemo(() => {
    const phanquyen = stateUser.userPoolAccess.filter(
      (obj) => obj.MAFORM === MAFORM_NGHIEPVU_PHANCONG
    )[0];
    return phanquyen;
  }, []);
  if (
    permission === undefined ||
    Object.keys(permission).length === 0 ||
    permission.THEM === 0
  ) {
    CustomAlert(stateUser.userName + " không có quyền Phân Công");
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
      isResetPageEmpty={true}
      listMaDongPhanCongAddButWaitSave={listMaDongPhanCongAddButWaitSave}
      dataDeleteButWaitSave={dataDeleteButWaitSave}
    >
      <FormNghiepVuPhanCong
        isSaveData={isSaveData}
        setIsSaveData={setIsSaveData}
        permission={permission}
        listMaDongPhanCongAddButWaitSave={listMaDongPhanCongAddButWaitSave}
        setListMaDongPhanCongAddButWaitSave={
          setListMaDongPhanCongAddButWaitSave
        }
        dataDeleteButWaitSave={dataDeleteButWaitSave}
        setDataDeleteButWaitSave={setDataDeleteButWaitSave}
      />
    </Modal>
  );
};
export default PhanCong;
