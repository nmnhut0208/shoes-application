import { useState, useEffect } from "react";
import { FormGiayBasic } from "~hang_hoa";
import styles from "./FormGiay.module.scss";

const FormGiay = ({ setShowModal }) => {
  const [dataForm, setDataForm] = useState({});

  const handleSaveFrom = async () => {
    if (dataForm["MAGIAY"] == "") {
      alert("Chưa nhập đủ thông tin!");
      return false;
    }
    const response = await fetch(
      "http://localhost:8000/giay/check_MAGIAY_existed?MAGIAY=" +
        dataForm["MAGIAY"]
    );
    const result = await response.json();
    if (result[dataForm["MAGIAY"]]) {
      alert("Mã giày đã tồn tại");
      return false;
    }
    fetch("http://localhost:8000/giay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForm),
    })
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    setShowModal(false);
  };

  const handleNhapTiep = () => {
    var form_emty = {};
    for (let key in dataForm) {
      console.log(key, form_emty[key]);
      form_emty[key] = "";
    }
    setDataForm(form_emty);
  };

  return (
    <>
      <FormGiayBasic form={dataForm} setDataForm={setDataForm} mode="add" />
      <div className={styles.form}>
        <div className={styles.group_button}>
          <div>
            <button onClick={handleSaveFrom}>Lưu</button>
            <button onClick={handleNhapTiep}>Nhập tiếp</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default FormGiay;
