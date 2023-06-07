import { useState } from "react";
import styles from "./FormMau.module.scss";
import { FormMauBasic } from "~hang_hoa";
import { useTableContext, actions_table } from "~table_context";

const FormMau = ({ dataMau, setDataMau }) => {
  const [dataForm, setDataForm] = useState({});
  const [stateTable, dispatchTable] = useTableContext();

  const handleSaveFrom = () => {
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
