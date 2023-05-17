import { useState } from "react";
import clsx from "clsx";
import styles from "./FormKhoHang.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormKhoHang = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);
  console.log("record form: re-render");
  // console.log("inputForm: ", inputForm);

  const handleChangeInformationForm = (e) => {
    const data = { ...inputForm };
    data[e.target.name] = e.target.value;
    setInputForm(data);
  };

  const handleSaveFrom = () => {
    // saveDataBase()
    if (stateTable.inforShowTable.action_row === "edit") {
      fetch("http://localhost:8000/khohang", {
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
            info["MAKHO"] === inputForm["MAKHO"] ? inputForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      fetch("http://localhost:8000/khohang", {
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
    }
    dispatchTable(actions_table.setModeShowModal(false));
  };

  return (
    <div className={styles.form}>
      <form>
        <div className={styles.group_first}>
          <div className={styles.group_first_row}>
            <label>Mã kho hàng</label>
            <input
              value={inputForm["MAKHO"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="MAKHO"
              className={styles.item_size_middle}
            />
          </div>
          <div className={styles.group_first_row}>
            <label>Tên kho hàng</label>
            <input
              value={inputForm["TENKHO"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="TENKHO"
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
          <div className={styles.group_button}>
            <div>
              <button onClick={handleSaveFrom}>Lưu</button>
              <button>Nhập tiếp</button>
              <button>Đóng</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormKhoHang;
