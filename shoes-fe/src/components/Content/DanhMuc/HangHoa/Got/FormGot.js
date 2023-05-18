import { useState } from "react";
import styles from "./FormGot.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormGot = () => {
  // TODO: Sau này sửa STT thành tên duy nhất.
  const [stateTable, dispatchTable] = useTableContext();
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);

  const handleChangeInformationForm = (e) => {
    const data = { ...inputForm };
    data[e.target.name] = e.target.value;
    setInputForm(data);
  };

  const handleSaveFrom = () => {
    if (stateTable.inforShowTable.action_row === "edit") {
      // saveDataBase()
      dispatchTable(
        actions_table.setInforTable(
          stateTable.inforShowTable.infoTable.map((info) =>
            info.MAGOT === inputForm.MAGOT ? inputForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      dispatchTable(
        actions_table.setInforTable([
          ...stateTable.inforShowTable.infoTable,
          inputForm,
        ])
      );
      // saveDataBase()
    }

    dispatchTable(actions_table.setModeShowModal(false));
  };

  var image_url =
    "https://img.freepik.com/free-vector/cats-doodle-pattern-background_53876-100663.jpg?w=900&t=st=1680945739~exp=1680946339~hmac=0a6288d0cf4d9b1a566b96eeaad8db3beb69fa0729f4ffecfcc866bbfecaf4e2";

  return (
    <div className={styles.form}>
      <div className={styles.content}>
        <div className={styles.items_container}>
          <div className={styles.item}>
            <label>Mã gót</label>
            <input
              name="MAGOT"
              value={inputForm["MAGOT"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>

          <div className={styles.item}>
            <label>Tên gót</label>
            <input
              name="TENGOT"
              value={inputForm["TENGOT"]}
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

export default FormGot;
