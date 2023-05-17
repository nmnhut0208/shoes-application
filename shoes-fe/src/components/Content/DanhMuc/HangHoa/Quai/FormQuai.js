import { useState } from "react";
import clsx from "clsx";
import styles from "./FormQuai.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormQuai = () => {
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
          info.MAQUAI === inputForm.MAQUAI ? inputForm : info
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
            <label>Mã quai</label>
            <input
              name="MAQUAI"
              value={inputForm["MAQUAI"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>

          <div className={styles.item}>
            <label>Tên quai</label>
            <input
              name="TENQUAI"
              value={inputForm["TENQUAI"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>

          <div className={styles.item}>
            <label>Đơn giá quai</label>
            <input
              name="DONGIA"
              value={inputForm["DONGIA"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
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

export default FormQuai;
