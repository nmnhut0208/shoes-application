import { useState } from "react";
import styles from "./FormMau.module.scss";
import { FormMauBasic } from "~hang_hoa";
import { useItemsContext } from "~items_context";
import { checkMaDanhMucExisted } from "~danh_muc/helper";

const FormMau = ({ dataMau, setDataMau, setShowModal }) => {
  const [dataForm, setDataForm] = useState({});
  const [stateItem, dispatchItem] = useItemsContext();

  const handleSaveFrom = () => {
    if (dataForm["MAMAU"] == "") {
      alert("Chưa nhập đủ thông tin!!!");
      return false;
    }
    if (
      checkMaDanhMucExisted(dataForm["MAMAU"], stateItem.infoItemMau, "value")
    ) {
      alert("MÃ này đã tồn tại. Bạn không thể thêm!!!");
      return false;
    }
    fetch("http://localhost:8000/mau", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForm),
    })
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    setDataMau([
      ...dataMau,
      { label: dataForm["TENMAU"], value: dataForm["MAMAU"] },
    ]);
    setShowModal(false);
  };

  return (
    <div className={styles.form}>
      <FormMauBasic initForm={dataForm} setDataForm={setDataForm} />

      <div className={styles.group_button}>
        <button onClick={handleSaveFrom}>Lưu</button>
        <button>Button 2</button>
      </div>
    </div>
  );
};

export default FormMau;
