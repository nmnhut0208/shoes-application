import moment from "moment";
import { useState } from "react";
import clsx from "clsx";
import styles from "./FormKyTinhLuong.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormKyTinhLuong = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);
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
    if (stateTable.inforShowTable.action_row === "edit") {
      fetch("http://localhost:8000/kytinhluong", {
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
            info["MAKY"] === inputForm["MAKY"] ? inputForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      fetch("http://localhost:8000/kytinhluong", {
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
            <label>Mã kỳ</label>
            <input
              value={inputForm["MAKY"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="MAKY"
              className={styles.item_size_small}
            />
          </div>
          <div className={styles.group_first_row}>
            <label>Tên kỳ</label>
            <input
              value={inputForm["TENKY"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="TENKY"
              className={styles.item_size_big}
            />
          </div>
        </div>
        <div className={styles.group_second}>
          <div className={styles.group_second_row}>
            <label>Từ ngày </label>
            <input
              value={convertDate(inputForm["TUNGAY"])}
              type="date"
              name="TUNGAY"
              onChange={(e) => handleChangeInformationDateForm(e)}
            />
          </div>
          <div className={styles.group_second_row}>
            <label>Đến ngày</label>
            <input
              value={convertDate(inputForm["DENNGAY"])}
              type="date"
              name="DENNGAY"
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
