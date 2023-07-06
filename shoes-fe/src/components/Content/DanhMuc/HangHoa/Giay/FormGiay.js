import { useState } from "react";
import { useTableContext, actions_table } from "~table_context";
import FormGiayBasic from "./FormGiayBasic";
import styles from "./FormGiayBasic.module.scss";
import { checkMaDanhMucExisted } from "~danh_muc/helper";

const FormGiay = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [dataForm, setDataForm] = useState(stateTable.inforShowTable.record);

  const handleSaveFrom = (event) => {
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
      if (
        checkMaDanhMucExisted(
          dataForm["MAGIAY"],
          stateTable.inforShowTable.infoTable,
          "MAGIAY"
        )
      ) {
        alert("MÃ này đã tồn tại. Bạn không thể thêm!!!");
        event.preventDefault();
        return false;
      }
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
          <button>Nhân bản</button>
          <button>Second first</button>
        </div>

        <div>
          {stateTable.inforShowTable.action_row !== "view" && (
            <button onClick={(event) => handleSaveFrom(event)}>Lưu</button>
          )}
          {stateTable.inforShowTable.action_row !== "view" && (
            <button onClick={handleNhapTiep}>Nhập tiếp</button>
          )}
        </div>
      </div>
    </>
  );
};

export default FormGiay;
