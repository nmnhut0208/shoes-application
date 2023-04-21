import moment from "moment";
import { useState } from "react";
import clsx from "clsx";
import styles from "./FormKyTinhLuong.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormKyTinhLuong = () => {
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

  const handleChangeInformationDateForm = (e) => {
    const data = { ...inputForm };
    console.log(e.target.value);
    data[e.target.name] = moment(e.target.value, "YYYY-MM-DD").format(
      "DD-MM-YYYY"
    );
    setInputForm(data);
  };

  const convertDate = (date) => {
    return moment(date, "DD-MM-YYYY").format("YYYY-MM-DD");
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
            <label>Mã kỳ</label>
            <input
              value={inputForm["Mã kỳ"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="Mã kỳ"
              className={styles.item_size_small}
            />
          </div>
          <div className={styles.group_first_row}>
            <label>Tên kỳ</label>
            <input
              value={inputForm["Tên kỳ"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="Tên kỳ"
              className={styles.item_size_big}
            />
          </div>
        </div>
        <div className={styles.group_second}>
          <div className={styles.group_second_row}>
            <label>Từ ngày </label>
            <input
              value={convertDate(inputForm["Từ ngày"])}
              type="date"
              name="Từ ngày"
              onChange={(e) => handleChangeInformationDateForm(e)}
            />
          </div>
          <div className={styles.group_second_row}>
            <label>Đến ngày</label>
            <input
              value={convertDate(inputForm["Đến ngày"])}
              type="date"
              name="Đến ngày"
              onChange={(e) => handleChangeInformationDateForm(e)}
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

export default FormKyTinhLuong;
