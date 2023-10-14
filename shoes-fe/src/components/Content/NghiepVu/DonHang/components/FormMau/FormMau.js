import { useState } from "react";
import styles from "./FormMau.module.scss";
import { FormMauBasic } from "~hang_hoa";
import { checkMaDanhMucExisted } from "~danh_muc/helper";
import { CustomAlert } from "~utils/alert_custom";

import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";

const list_input_required = {
  MAMAU: "Mã màu",
  TENMAU: "Tên màu",
};

const FormMau = ({ dataMau, setDataMau, setShowModal }) => {
  const [dataForm, setDataForm] = useState({});
  const [stateItem, dispatchItem] = useItemsContext();

  const handleSaveFrom = () => {
    for (let key in list_input_required) {
      if (dataForm[key] === undefined || dataForm[key] === "") {
        CustomAlert("Nhập " + list_input_required[key]);
        return false;
      }
    }
    if (
      checkMaDanhMucExisted(dataForm["MAMAU"], stateItem.infoItemMau, "value")
    ) {
      CustomAlert("MÃ này đã tồn tại. Bạn không thể thêm!!!");
      return false;
    }
    fetch("http://localhost:8000/mau", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForm),
    })
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    setDataMau([
      ...dataMau,
      { label: dataForm["TENMAU"], value: dataForm["MAMAU"] },
    ]);

    dispatchItem(
      actions_items_context.setInfoMau([
        ...stateItem.infoItemMau,
        { label: dataForm["TENMAU"], value: dataForm["MAMAU"] },
      ])
    );
    setShowModal(false);
  };

  return (
    <div className={styles.form}>
      <FormMauBasic initForm={dataForm} setDataForm={setDataForm} />

      <div className={styles.group_button}>
        <button onClick={handleSaveFrom}>Lưu</button>
      </div>
    </div>
  );
};

export default FormMau;
