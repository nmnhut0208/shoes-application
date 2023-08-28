import { useState } from "react";
import styles from "./FormDe.module.scss";
import { useTableContext, actions_table } from "~table_context";
import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";
import { checkMaDanhMucExisted } from "~danh_muc/helper";
import { handleDisableKeyDownUp, handleFocus } from "~utils/event";

const FormDe = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [stateItem, dispatchItem] = useItemsContext();
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);

  const handleChangeInformationForm = (e) => {
    const data = { ...inputForm };
    data[e.target.name] = e.target.value;
    setInputForm(data);
  };

  const handleSaveFrom = () => {
    if (inputForm["DONGIA"] == "") {
      alert("Nhập đơn giá đế!!!");
      return false;
    }
    let method = "";
    if (stateTable.inforShowTable.action_row === "edit") {
      method = "PUT";
      dispatchTable(
        actions_table.setInforTable(
          stateTable.inforShowTable.infoTable.map((info) =>
            info["MADE"] === inputForm["MADE"] ? inputForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      if (
        checkMaDanhMucExisted(
          inputForm["MADE"],
          stateTable.inforShowTable.infoTable,
          "MADE"
        )
      ) {
        alert("MÃ này đã tồn tại. Bạn không thể thêm!!!");
        return false;
      }
      method = "POST";
      dispatchTable(
        actions_table.setInforTable([
          ...stateTable.inforShowTable.infoTable,
          inputForm,
        ])
      );
      dispatchItem(
        actions_items_context.setInfoDe([
          ...stateItem.infoItemDe,
          { label: inputForm["TENDE"], value: inputForm["MADE"] },
        ])
      );
    }
    fetch("http://localhost:8000/de", {
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
      <div className={styles.group_first}>
        <div className={styles.group_first_row}>
          <label>Mã Đế</label>
          <input
            value={inputForm["MADE"]}
            onChange={(e) => handleChangeInformationForm(e)}
            name="MADE"
            className={styles.item_size_middle}
            readOnly={stateTable.inforShowTable.action_row === "edit"}
          />
        </div>
        <div className={styles.group_first_row}>
          <label>Tên Đế</label>
          <input
            value={inputForm["TENDE"]}
            onChange={(e) => handleChangeInformationForm(e)}
            name="TENDE"
            className={styles.item_size_big}
          />
        </div>
        <div className={styles.group_first_row}>
          <label>Đơn giá Đế</label>
          <input
            value={inputForm["DONGIA"]}
            onChange={(e) => handleChangeInformationForm(e)}
            name="DONGIA"
            type="number"
            onKeyDown={handleDisableKeyDownUp}
            onKeyUp={handleDisableKeyDownUp}
            onFocus={handleFocus}
            className={styles.item_size_middle}
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
        </div>
      </div>
    </div>
  );
};

export default FormDe;
