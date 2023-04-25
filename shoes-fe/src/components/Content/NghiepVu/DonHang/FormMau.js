import { useState } from "react";
import clsx from "clsx";
import styles from "./DonHang.module.scss";
import { FormMauBasic } from "~hang_hoa";

const FormMau = () => {
  const [dataForm, setDataForm] = useState({});

  const handleSaveFrom = () => {
    // saveDataBase()
  };

  return (
    <div className={styles.form}>
      <FormMauBasic initForm={dataForm} setDataForm={setDataForm} />

      <div className={styles.group_button}>
        <button onClick={handleSaveFrom}>Lưu</button>
        <button>Button 2</button>
        <button>Đóng</button>
      </div>
    </div>
  );
};

export default FormMau;
