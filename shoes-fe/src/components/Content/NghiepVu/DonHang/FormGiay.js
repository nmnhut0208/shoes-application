import { useState, useEffect } from "react";
import clsx from "clsx";
import { FormGiayBasic, FormMauBasic } from "~hang_hoa";
import styles from "./FormGiay.module.scss";

const FormGiay = () => {
  const [dataForm, setDataForm] = useState({});
  console.log("record form: re-render", dataForm);

  const handleSaveFrom = () => {
    // saveDataBase()
  };

  const handleNhapTiep = () => {
    var form_emty = {};
    for (let key in dataForm) {
      console.log(key, form_emty[key]);
      form_emty[key] = "";
    }
    setDataForm(form_emty);
  };
  console.log("thu", dataForm);

  return (
    <>
      <FormGiayBasic initForm={dataForm} setDataForm={setDataForm} />
      <div className={styles.form}>
        <div className={styles.group_button}>
          <div>
            <button>Button first</button>
            <button>Second first</button>
          </div>

          <div>
            <button onClick={handleSaveFrom}>Lưu</button>
            <button onClick={handleNhapTiep}>Nhập tiếp</button>
            {/* <button>Đóng</button> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default FormGiay;
