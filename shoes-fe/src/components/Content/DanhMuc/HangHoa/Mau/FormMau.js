import { useState } from "react";
import styles from "./FormMau.module.scss";
import FormMauBasic from "./FormMauBasic";
import { useTableContext, actions_table } from "~table_context";
import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";
import { checkMaDanhMucExisted } from "~danh_muc/helper";
import { CustomAlert } from "~utils/alert_custom";

const list_input_required = {
  MAMAU: "Mã màu",
  TENMAU: "Tên màu",
};

const FormMau = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [dataForm, setDataForm] = useState(stateTable.inforShowTable.record);
  const [stateItem, dispatchItem] = useItemsContext();

  const handleSaveFrom = () => {
    for (let key in list_input_required) {
      if (dataForm[key] === undefined || dataForm[key] === "") {
        CustomAlert("Nhập " + list_input_required[key]);
        return false;
      }
    }
    let method = "";
    if (stateTable.inforShowTable.action_row === "edit") {
      method = "PUT";
      dispatchTable(
        actions_table.setInforTable(
          stateTable.inforShowTable.infoTable.map((info) =>
            info.MAMAU === dataForm.MAMAU ? dataForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      if (
        checkMaDanhMucExisted(
          dataForm["MAMAU"],
          stateTable.inforShowTable.infoTable,
          "MAMAU"
        )
      ) {
        CustomAlert("MÃ này đã tồn tại. Bạn không thể thêm!!!");
        return false;
      }
      method = "POST";
      dispatchTable(
        actions_table.setInforTable([
          ...stateTable.inforShowTable.infoTable,
          dataForm,
        ])
      );

      dispatchItem(
        actions_items_context.setInfoMau([
          ...stateItem.infoItemMau,
          {
            label: dataForm["TENMAU"],
            value: dataForm["MAMAU"],
          },
        ])
      );
    }
    fetch("http://localhost:8000/mau", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForm),
    })
      .then((response) => {
        CustomAlert("Lưu thành công.");
      })
      .catch((error) => {
        console.log("error: ", error);
        CustomAlert("Xảy ra lỗi. Chưa lưu được.");
      });
    dispatchTable(actions_table.setModeShowModal(false));
  };

  return (
    <div className={styles.form}>
      <FormMauBasic
        initForm={dataForm}
        setDataForm={setDataForm}
        mode={stateTable.inforShowTable.action_row}
      />

      <div className={styles.button_container}>
        <button onClick={handleSaveFrom}>Lưu</button>
      </div>
    </div>
  );
};

export default FormMau;
