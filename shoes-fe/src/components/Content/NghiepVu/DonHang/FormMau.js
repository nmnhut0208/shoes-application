import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./DonHang.module.scss";
import { FormMauBasic } from "~hang_hoa";
import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";

const FormMau = () => {
  const [dataForm, setDataForm] = useState({});
  const [stateTable, dispatchTable] = useTableContext();

  // useEffect(() => {
  //   dispatchTable(actions_table.setTitleModal("Màu sắc - F0010"));
  //   dispatchTable(actions_table.setModeShowModal(true));
  // }, []);
  const handleSaveFrom = () => {
    // saveDataBase()
    dispatchTable(actions_table.setModeShowModal(false));
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
