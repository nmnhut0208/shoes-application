import { useState } from "react";
import clsx from "clsx";
import styles from "./FormMui.module.scss";
import { useTableContext, actions_table } from "~table_context";
import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";

const FormMui = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [stateItem, dispatchItem] = useItemsContext();
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);
  console.log("record form: re-render");

  const handleChangeInformationForm = (e) => {
    const data = { ...inputForm };
    data[e.target.name] = e.target.value;
    setInputForm(data);
  };

  const handleSaveFrom = () => {
    let method = "";
    if (stateTable.inforShowTable.action_row === "edit") {
      method = "PUT";
      dispatchTable(
        actions_table.setInforTable(
          stateTable.inforShowTable.infoTable.map((info) =>
            info["MAMUI"] === inputForm["MAMUI"] ? inputForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      method = "POST";
      dispatchTable(
        actions_table.setInforTable([
          ...stateTable.inforShowTable.infoTable,
          inputForm,
        ])
      );
      dispatchItem(
        actions_items_context.setInfoMui([
          ...stateItem.infoItemMui,
          { label: inputForm["TENMUI"], value: inputForm["MAMUI"] },
        ])
      );
    }
    fetch("http://localhost:8000/mui", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputForm),
    })
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    dispatchTable(actions_table.setModeShowModal(false));
  };

  return (
    <div className={styles.form}>
      <form>
        <div className={styles.group_first}>
          <div className={styles.group_first_row}>
            <label>Mã Mũi</label>
            <input
              value={inputForm["MAMUI"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="MAMUI"
              className={styles.item_size_middle}
              readOnly={stateTable.inforShowTable.action_row === "edit"}
            />
          </div>
          <div className={styles.group_first_row}>
            <label>Tên Mũi</label>
            <input
              value={inputForm["TENMUI"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="TENMUI"
              className={styles.item_size_big}
            />
          </div>
          <div className={styles.group_first_row}>
            <label>Ghi chú</label>
            <input
              value={inputForm["GHICHU"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="GHICHU"
              className={styles.item_size_big}
            />
          </div>
        </div>
        <div className={styles.group_button}>
          <div>
            <button onClick={handleSaveFrom}>Lưu</button>
            <button>Nhập tiếp</button>
            <button>Đóng</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormMui;
