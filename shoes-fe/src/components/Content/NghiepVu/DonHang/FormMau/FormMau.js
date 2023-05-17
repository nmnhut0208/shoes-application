import { useState } from "react";
import styles from "./FormMau.module.scss";
import { FormMauBasic } from "~hang_hoa";
import { useTableContext, actions_table } from "~table_context";

const FormMau = () => {
  const [dataForm, setDataForm] = useState({});
  const [stateTable, dispatchTable] = useTableContext();

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
