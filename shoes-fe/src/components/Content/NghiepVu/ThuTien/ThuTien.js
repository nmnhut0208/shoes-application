import { useMemo, useState } from "react";
import ModalMain from "./ModalMain";
import { useUserContext } from "~user";
import FormThuTien from "./FormThuTien";

const MAFORM_THUTIEN = "F0036";

const ThuTien = () => {
  const [stateUser, dispatchUser] = useUserContext();
  const [showModal, setShowModal] = useState(true);

  const permission = useMemo(() => {
    const phanquyen = stateUser.userPoolAccess.filter(
      (obj) => obj.MAFORM === MAFORM_THUTIEN
    )[0];
    return phanquyen;
  }, []);
  if (permission.THEM === 0) {
    alert(stateUser.userName + " không có quyền thêm Thu Tiền");
    return null;
  }

  return (
    <>
      <ModalMain
        title="Thu Tiền"
        status={showModal}
        setShowModal={setShowModal}
        isResetPageEmpty={true}
      >
        <FormThuTien type_action="add" />
      </ModalMain>
    </>
  );
};

export default ThuTien;
