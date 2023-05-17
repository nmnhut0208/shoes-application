import { useState, useEffect } from "react";
import styles from "./FormMau.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormMauBasic = ({ initForm, setDataForm }) => {
  // TODO: Sau này sửa STT thành tên duy nhất.
  const [form, setForm] = useState(() => initForm);
  useEffect(() => {
    setForm(initForm);
  }, [initForm]);

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
            name="MAMAU"
            value={form["MAMAU"]}
            onChange={(e) => handleChangeInformationForm(e)}
          />
        </div>

        <div className={styles.item}>
          <label>Tên màu</label>
          <input
            name="TENMAU"
            value={form["TENMAU"]}
            onChange={(e) => handleChangeInformationForm(e)}
          />
        </div>

        <div className={styles.item}>
          <label>Ghi chú</label>
          <input
            name="GHICHU"
            value={form["GHICHU"]}
            onChange={(e) => handleChangeInformationForm(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormMauBasic;
