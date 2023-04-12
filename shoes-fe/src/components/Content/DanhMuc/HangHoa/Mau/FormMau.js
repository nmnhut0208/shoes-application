import { useState } from "react";
import clsx from "clsx";
import styles from "./FormMau.module.scss";

const FormMau = ({ id, handleCancelForm, infoTable, setInfoTable }) => {
  // TODO: Sau này sửa STT thành tên duy nhất.
  const [inputForm, setInputForm] = useState(() => {
    var infos = infoTable.filter((obj) => {
      return obj.STT === id;
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
    setInfoTable(
      infoTable.map((info) => (info.STT === inputForm.STT ? inputForm : info))
    );
    handleCancelForm(false);
  };

  return (
    <div className={styles.form}>
      <div className={styles.items_container}>
        <div className={styles.item}>
          <label>Mã màu</label>
          <input
            name="Mã màu"
            value={inputForm["Mã màu"]}
            onChange={(e) => handleChangeInformationForm(e)}
          />
        </div>

        <div className={styles.item}>
          <label>Tên màu</label>
          <input
            name="Tên màu"
            value={inputForm["Tên màu"]}
            onChange={(e) => handleChangeInformationForm(e)}
          />
        </div>

        <div className={styles.item}>
          <label>Ghi chú</label>
          <input
            name="Ghi chú"
            value={inputForm["Ghi chú"]}
            onChange={(e) => handleChangeInformationForm(e)}
          />
        </div>
      </div>

      <div className={styles.button_container}>
        <button onClick={handleSaveFrom}>Lưu</button>
        <button>Button 2</button>
        <button>Đóng</button>
      </div>
      
    </div>
  );
};

export default FormMau;
