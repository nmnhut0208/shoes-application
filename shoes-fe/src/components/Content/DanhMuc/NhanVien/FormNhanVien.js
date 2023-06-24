import { useState } from "react";
import clsx from "clsx";
import styles from "./FormNhanVien.module.scss";
import { useTableContext, actions_table } from "~table_context";
import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";

const FormNhanVien = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);
  console.log("record form: re-render");
  const [stateItem, dispatchItem] = useItemsContext();

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
            info["MANVIEN"] === inputForm["MANVIEN"] ? inputForm : info
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
      if (inputForm["LOAINVIEN"] === "TD") {
        dispatchItem(
          actions_items_context.setInfoThoDe([
            ...stateItem.infoItemThoDe,
            { label: inputForm["TENNVIEN"], value: inputForm["MANVIEN"] },
          ])
        );
      }
      if (inputForm["LOAINVIEN"] === "TQ") {
        dispatchItem(
          actions_items_context.setInfoThoQuai([
            ...stateItem.infoItemThoQuai,
            { label: inputForm["TENNVIEN"], value: inputForm["MANVIEN"] },
          ])
        );
      }
    }
    fetch("http://localhost:8000/nhanvien", {
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
            <label>Mã nhân viên</label>
            <input
              value={inputForm["MANVIEN"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="MANVIEN"
              className={styles.item_size_small}
              readOnly={stateTable.inforShowTable.action_row === "edit"}
            />
          </div>
          <div className={styles.group_first_row}>
            <label>Tên nhân viên</label>
            <input
              value={inputForm["TENNVIEN"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="TENNVIEN"
              className={styles.item_size_big}
            />
          </div>
          <div className={styles.group_first_row}>
            <label>Loại nhân viên</label>
            <select
              value={inputForm["LOAINVIEN"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="LOAINVIEN"
              className={styles.item_size_middle}
            >
              <option value="QL">Quản lý</option>
              <option value="TD">Thợ đế</option>
              <option value="TQ">Thợ quai</option>
            </select>
          </div>
        </div>
        <div className={styles.group_second}>
          <div className={styles.group_second_row}>
            <label>Ghi chú</label>
            <textarea
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

export default FormNhanVien;
