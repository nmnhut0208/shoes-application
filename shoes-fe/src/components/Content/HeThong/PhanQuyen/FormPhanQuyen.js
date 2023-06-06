import { useState } from "react";
import { useTableContext, actions_table } from "~table_context";
import styles from "./FormPhanQuyen.module.scss";

const FormPhanQuyen = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);
  console.log("phan quyen:", inputForm);

  const handleChangeInformationForm = (e) => {
    const data = { ...inputForm };
    data[e.target.name] = e.target.value;
    setInputForm(data);
  };

  const handleSaveFrom = () => {
    // saveDataBase()
    if (stateTable.inforShowTable.action_row === "edit") {
      fetch("http://localhost:8000/phanquyen", {
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
            info["MANVIEN"] === inputForm["MANVIEN"] &&
            info["MAFORM"] === inputForm["MAFORM"]
              ? inputForm
              : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      fetch("http://localhost:8000/phanquyen", {
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
        <div className={styles.form_group}>
          <div className={styles.form_group_first}>
            <label>Mã Nhân Viên</label>
            <input
              value={inputForm["MANVIEN"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="MANVIEN"
              className={styles.item_size_big}
            />
          </div>
          <div className={styles.form_group_first}>
            <label>Mã Form</label>
            <input
              value={inputForm["MAFORM"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="MAFORM"
              className={styles.item_size_big}
            />
          </div>
          <div className={styles.form_group_first}>
            <label>Tên Form</label>
            <input
              value={inputForm["TENFORM"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="TENFORM"
              className={styles.item_size_big}
            />
          </div>
          <div className={styles.form_group_first}>
            <label>Thêm</label>
            <input
              value={inputForm["THEM"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="THEM"
              className={styles.item_size_small}
              type="number"
              min={0}
              max={1}
            />
          </div>
          <div className={styles.form_group_first}>
            <label>Sửa</label>
            <input
              value={inputForm["SUA"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="SUA"
              className={styles.item_size_small}
              type="number"
              min={0}
              max={1}
            />
          </div>
          <div className={styles.form_group_first}>
            <label>Xóa</label>
            <input
              value={inputForm["XOA"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="XOA"
              className={styles.item_size_small}
              type="number"
              min={0}
              max={1}
            />
          </div>
          <div className={styles.form_group_first}>
            <label>Xem</label>
            <input
              value={inputForm["XEM"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="XEM"
              className={styles.item_size_small}
              type="number"
              min={0}
              max={1}
            />
          </div>
          <div className={styles.form_group_first}>
            <label>In</label>
            <input
              value={inputForm["IN"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="IN"
              className={styles.item_size_small}
              type="number"
              min={0}
              max={1}
            />
          </div>
        </div>
        <div className={styles.form_button}>
          <button onClick={handleSaveFrom}>Lưu</button>
        </div>
      </form>
    </div>
  );
};

export default FormPhanQuyen;
