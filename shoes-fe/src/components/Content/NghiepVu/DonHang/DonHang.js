import { useState } from "react";
import Modal from "./Modal";
import FormDonHang from "./components";
const DonHang = () => {
  const [isSaveData, setIsSaveData] = useState(true);
  const [showModal, setShowModal] = useState(true);

  return (
    <Modal
      status={showModal}
      title="Đơn hàng - F0032"
      setShowModal={setShowModal}
      isSaveData={isSaveData}
    >
      <FormDonHang
        setShowModalNghiepVuDonHang={setShowModal}
        setIsSaveDataNghiepVuDonHang={setIsSaveData}
      />
    </Modal>
  );
};
export default DonHang;
