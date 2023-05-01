import { useState } from "react";
import clsx from "clsx";
import styles from "./FormMau.module.scss";
import FormMauBasic from "./FormMauBasic";
import { useTableContext, actions_table } from "~table_context";

const FormMau = () => {
  // TODO: Sau này sửa STT thành tên duy nhất.
  const [stateTable, dispatchTable] = useTableContext();
  const [dataForm, setDataForm] = useState(() => {
    var infos = stateTable.inforShowTable.infoTable.filter((obj) => {
      return obj.STT === stateTable.inforShowTable.record.STT;
    });
    return infos[0];
  });
  console.log("record form: re-render");

  const handleSaveFrom = () => {
    // saveDataBase()
    dispatchTable(
      actions_table.setInforTable(
        stateTable.inforShowTable.infoTable.map((info) =>
          info.STT === dataForm.STT ? dataForm : info
        )
      )
    );
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
