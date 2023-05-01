import { useState, useEffect } from "react";
import clsx from "clsx";
import { FormGiayBasic, FormMauBasic } from "~hang_hoa";
import styles from "./FormGiay.module.scss";
import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";

const FormGiay = () => {
  const [dataForm, setDataForm] = useState({});
  const [stateTable, dispatchTable] = useTableContext();

  // useEffect(() => {
  //   dispatchTable(actions_table.setTitleModal("Giày - F0025"));
  //   dispatchTable(actions_table.setModeShowModal(true));
  // }, []);

  const handleSaveFrom = () => {
    // saveDataBase()
    dispatchTable(actions_table.setModeShowModal(false));
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
