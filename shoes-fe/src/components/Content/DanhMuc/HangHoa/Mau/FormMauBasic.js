import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./FormMau.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormMauBasic = ({ initForm, setDataForm }) => {
  // TODO: Sau này sửa STT thành tên duy nhất.
  const [form, setForm] = useState(() => initForm);
  useEffect(() => {
    setForm(initForm);
  }, [initForm]);
  console.log("record form: re-render");

  const handleChangeInformationForm = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
    setDataForm(data);
  };

  return (
    <div className={styles.form}>
      <div className={styles.items_container}>
        <div className={styles.item}>
          <label>Mã màu</label>
          <input
            name="Mã màu"
            value={form["Mã màu"]}
            onChange={(e) => handleChangeInformationForm(e)}
          />
        </div>

        <div className={styles.item}>
          <label>Tên màu</label>
          <input
            name="Tên màu"
            value={form["Tên màu"]}
            onChange={(e) => handleChangeInformationForm(e)}
          />
        </div>

        <div className={styles.item}>
          <label>Ghi chú</label>
          <input
            name="Ghi chú"
            value={form["Ghi chú"]}
            onChange={(e) => handleChangeInformationForm(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormMauBasic;
