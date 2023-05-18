import { useState } from "react";
import clsx from "clsx";
import styles from "./FormMau.module.scss";
import FormMauBasic from "./FormMauBasic";
import { useTableContext, actions_table } from "~table_context";

const FormMau = () => {
  // TODO: Sau này sửa STT thành tên duy nhất.
  const [stateTable, dispatchTable] = useTableContext();
  const [dataForm, setDataForm] = useState(stateTable.inforShowTable.record);

  const handleSaveFrom = () => {
    if (stateTable.inforShowTable.action_row === "edit") {
      // saveDataBase()
      dispatchTable(
        actions_table.setInforTable(
          stateTable.inforShowTable.infoTable.map((info) =>
            info.MAMAU === dataForm.MAMAU ? dataForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      dispatchTable(
        actions_table.setInforTable([
          ...stateTable.inforShowTable.infoTable,
          dataForm,
        ])
      );
      // saveDataBase()
    }
    dispatchTable(actions_table.setModeShowModal(false));
  };

  return (
    <div className={styles.form}>
      <FormMauBasic initForm={dataForm} setDataForm={setDataForm} />

      <div className={styles.button_container}>
        <button onClick={handleSaveFrom}>Lưu</button>
        <button>Button 2</button>
        <button>Đóng</button>
      </div>
    </div>
  );
};

export default FormMau;
