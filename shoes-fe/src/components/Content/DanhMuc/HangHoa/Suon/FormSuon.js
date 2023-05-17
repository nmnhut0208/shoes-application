import { useState } from "react";
import clsx from "clsx";
import styles from "./FormSuon.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormSuon = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);

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
          info.MASUON === inputForm.MASUON ? inputForm : info
        )
      )
    );
    dispatchTable(actions_table.setModeShowModal(false));
  };

  var image_url =
    "https://img.freepik.com/free-vector/cats-doodle-pattern-background_53876-100663.jpg?w=900&t=st=1680945739~exp=1680946339~hmac=0a6288d0cf4d9b1a566b96eeaad8db3beb69fa0729f4ffecfcc866bbfecaf4e2";

  return (
    <div className={styles.form}>
      <div className={styles.content}>
        <div className={styles.items_container}>
          <div className={styles.item}>
            <label>Mã sườn</label>
            <input
              name="MASUON"
              value={inputForm["MASUON"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>

          <div className={styles.item}>
            <label>Tên sườn</label>
            <input
              name="TENSUON"
              value={inputForm["TENSUON"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>

          <div className={styles.item}>
            <label>Mã gót</label>
            <input
              name="MAGOT"
              value={inputForm["MAGOT"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
            <span>Tên gót</span>
          </div>

          <div className={styles.item}>
            <label>Mã mũi</label>
            <input
              name="MAMUI"
              value={inputForm["MAMUI"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
            <span>Tên mũi</span>
          </div>

          <div className={styles.item}>
            <label>Ghi chú</label>
            <input
              name="GHICHU"
              value={inputForm["GHICHU"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>
        </div>

        <div className={styles.image_container}>
          <button>Chọn hình ảnh</button>
          <img src={image_url} />
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

export default FormSuon;
