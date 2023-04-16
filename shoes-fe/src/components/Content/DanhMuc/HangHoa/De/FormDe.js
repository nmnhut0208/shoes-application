import { useState } from "react";
import clsx from "clsx";
import styles from "./FormDe.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormDe = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [inputForm, setInputForm] = useState(() => {
    var infos = stateTable.inforShowTable.infoTable.filter((obj) => {
      return obj.STT === stateTable.inforShowTable.record.STT;
    });
    return infos[0];
  });
  console.log("record form: re-render");

  const handleChangeInformationForm = (e) => {
    const data = { ...inputForm };
    data[e.target.name] = e.target.value;
    setInputForm(data);
  };

  const handleSaveFrom = () => {
    // saveDataBase()
    dispatchTable(
      actions_table.setInforTable(
        stateTable.inforShowTable.infoTable.map((info) =>
          info.STT === inputForm.STT ? inputForm : info
        )
      )
    );
    dispatchTable(actions_table.setModeShowModal(false));
  };

  return (
    <div className={styles.form}>
      <form>
        <div className={styles.group_first}>
          <div className={styles.group_first_row}>
            <label>Mã Đế</label>
            <input
              value={inputForm["Mã Đế"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="Mã Đế"
              className={styles.item_size_middle}
            />
          </div>
          <div className={styles.group_first_row}>
            <label>Tên Đế</label>
            <input
              value={inputForm["Tên Đế"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="Tên Đế"
              className={styles.item_size_big}
            />
          </div>
          <div className={styles.group_first_row}>
            <label>Đơn giá Đế</label>
            <input
              value={inputForm["Đơn giá Đế"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="Đơn giá Đế"
              className={styles.item_size_middle}
            />
          </div>
          <div className={styles.group_first_row}>
            <label>Ghi chú</label>
            <input
              value={inputForm["Ghi chú"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="Ghi chú"
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
