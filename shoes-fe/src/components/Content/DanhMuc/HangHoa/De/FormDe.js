import { useState } from "react";
import clsx from "clsx";
import styles from "./FormDe.module.scss";
import { useTableContext, actions_table } from "~table_context";
import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";

const FormDe = () => {
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
    if (stateTable.inforShowTable.action_row === "edit") {
      fetch("http://localhost:8000/de", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputForm),
      })
        .then((response) => {
          console.log("response: ", response);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
      dispatchTable(
        actions_table.setInforTable(
          stateTable.inforShowTable.infoTable.map((info) =>
            info["MADE"] === inputForm["MADE"] ? inputForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      fetch("http://localhost:8000/de", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputForm),
      })
        .then((response) => {
          console.log("response: ", response);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
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
    dispatchTable(actions_table.setModeShowModal(false));
  };

  return (
    <div className={styles.form}>
      <form>
        <div className={styles.group_first}>
          <div className={styles.group_first_row}>
            <label>Mã Đế</label>
            <input
              value={inputForm["MADE"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="MADE"
              className={styles.item_size_middle}
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
            <button>Nhập tiếp</button>
            <button>Đóng</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormDe;
