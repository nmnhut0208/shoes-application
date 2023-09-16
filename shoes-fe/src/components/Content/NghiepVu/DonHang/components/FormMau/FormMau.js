import { useState } from "react";
import styles from "./FormMau.module.scss";
import { FormMauBasic } from "~hang_hoa";
import { checkMaDanhMucExisted } from "~danh_muc/helper";
import moment from "moment";
import { specialCharString, nof_length_value } from "~config/mau";


import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";


const FormMau = ({ dataMau, setDataMau, setShowModal, setRerenderMau }) => {
  const [dataForm, setDataForm] = useState({});
  const [stateItem, dispatchItem] = useItemsContext();

  const handleSaveFrom = () => {
    if (dataForm["MAMAU"] == "") {
      alert("Chưa nhập đủ thông tin!!!");
      return false;
    }
    if (
      checkMaDanhMucExisted(dataForm["MAMAU"], stateItem.infoItemMau, "value")
    ) {
      alert("MÃ này đã tồn tại. Bạn không thể thêm!!!");
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
    let len = nof_length_value - dataForm["MAMAU"].length;
        if (len <= 0) len = 1;
    dispatchItem(
      actions_items_context.setInfoMau([
        ...stateItem.infoItemMau,
        { label: dataForm["MAMAU"] + specialCharString.repeat(len) +" - " + dataForm["TENMAU"], value: dataForm["MAMAU"] },
      ])
    );
    setRerenderMau(moment().format("YYYY-MM-DDTHH:mm:ss"));
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
