import moment from "moment";
import { useState } from "react";
import styles from "./FormKyTinhLuong.module.scss";
import { useTableContext, actions_table } from "~table_context";
import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";
import { checkMaDanhMucExisted } from "~danh_muc/helper";
import { convertDate } from "~utils/processing_date";

const FormKyTinhLuong = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [stateItem, dispatchItem] = useItemsContext();
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

  const handleSaveFrom = () => {
    let method = "";
    if (stateTable.inforShowTable.action_row === "edit") {
      method = "PUT";
      dispatchTable(
        actions_table.setInforTable(
          stateTable.inforShowTable.infoTable.map((info) =>
            info["MAKY"] === inputForm["MAKY"] ? inputForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      if (
        checkMaDanhMucExisted(
          inputForm["MAKY"],
          stateTable.inforShowTable.infoTable,
          "MAKY"
        )
      ) {
        alert("MÃ này đã tồn tại. Bạn không thể thêm!!!");
        return false;
      }
      method = "POST";
      dispatchTable(
        actions_table.setInforTable([
          ...stateTable.inforShowTable.infoTable,
          inputForm,
        ])
      );
      dispatchItem(
        actions_items_context.setInfoKyTinhLuong([
          ...stateItem.infoItemKyTinhLuong,
          { label: inputForm["TENKY"], value: inputForm["MAKY"] },
        ])
      );
    }
    fetch("http://localhost:8000/kytinhluong", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputForm),
    })
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });

    dispatchTable(actions_table.setModeShowModal(false));
  };

  return (
    <div className={styles.form}>
      <div className={styles.group_first}>
        <div className={styles.group_first_row}>
          <label>Mã kỳ</label>
          <input
            value={inputForm["MAKY"]}
            onChange={(e) => handleChangeInformationForm(e)}
            name="MAKY"
            className={styles.item_size_small}
            readOnly={stateTable.inforShowTable.action_row === "edit"}
            autocomplete="off"
          />
        </div>
        <div className={styles.group_first_row}>
          <label>Tên kỳ</label>
          <input
            value={inputForm["TENKY"]}
            onChange={(e) => handleChangeInformationForm(e)}
            name="TENKY"
            className={styles.item_size_big}
            autocomplete="off"
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
        </div>
      </div>
    </div>
  );
};

export default FormKyTinhLuong;
