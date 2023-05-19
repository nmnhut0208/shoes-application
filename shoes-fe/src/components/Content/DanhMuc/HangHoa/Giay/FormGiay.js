import { useState } from "react";
import { useTableContext, actions_table } from "~table_context";
import FormGiayBasic from "./FormGiayBasic";
import styles from "./FormGiayBasic.module.scss";

const FormGiay = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [dataForm, setDataForm] = useState(stateTable.inforShowTable.record);

  const handleSaveFrom = () => {
    let method = "";
    if (stateTable.inforShowTable.action_row === "edit") {
      method = "PUT";
      dispatchTable(
        actions_table.setInforTable(
          stateTable.inforShowTable.infoTable.map((info) =>
            info.MAGIAY === dataForm.MAGIAY ? dataForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      method = "POST";
      dispatchTable(
        actions_table.setInforTable([
          ...stateTable.inforShowTable.infoTable,
          dataForm,
        ])
      );
    }
    console.log("dataForm: ", dataForm);
    fetch("http://localhost:8000/giay", {
      method: method,
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
      <FormGiayBasic
        initForm={dataForm}
        setDataForm={setDataForm}
        mode={stateTable.inforShowTable.action_row}
      />

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
    </>
  );
};

export default FormGiay;
