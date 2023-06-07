import { useState } from "react";
import { FormGiayBasic } from "~hang_hoa";
import styles from "./FormGiay.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormGiay = () => {
  const [dataForm, setDataForm] = useState({});
  const [stateTable, dispatchTable] = useTableContext();

  const handleSaveFrom = () => {
    fetch("http://localhost:8000/giay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForm),
    })
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
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
