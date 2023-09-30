import { useState, useEffect } from "react";
import { FormGiayBasic } from "~hang_hoa";
import styles from "./FormGiay.module.scss";

const list_input_required = {
  MAGIAY: "Mã giày",
  TENGIAY: "Tên giày",
  MADE: "Mã đế",
  MASUON: "Mã sườn",
  MAQUAI: "Mã quai",
  DONGIA: "Đơn giá",
  MAKH: "Mã khách hàng",
  SortID: "Mã tham chiếu",
};

const FormGiay = ({
  setShowModal,
  MAKH,
  listGiayUnique,
  setListGiayUnique,
}) => {
  const [dataForm, setDataForm] = useState({});

  const handleSaveFrom = async () => {
    for (let key in list_input_required) {
      if (dataForm[key] === undefined || dataForm[key] === "") {
        alert("Nhập " + list_input_required[key]);
        return false;
      }
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

    if (MAKH == dataForm["MAKH"])
      setListGiayUnique([
        ...listGiayUnique,
        { MAGIAY: dataForm["MAGIAY"], TENGIAY: dataForm["TENGIAY"] },
      ]);
    setShowModal(false);
  };

  // const handleNhapTiep = () => {
  //   var form_emty = {};
  //   for (let key in dataForm) {
  //     form_emty[key] = "";
  //   }
  //   setDataForm(form_emty);
  // };

  return (
    <>
      <FormGiayBasic form={dataForm} setDataForm={setDataForm} mode="add" />
      <div className={styles.form}>
        <div className={styles.group_button}>
          <div>
            <button onClick={handleSaveFrom}>Lưu</button>
            {/* <button onClick={handleNhapTiep}>Nhập tiếp</button> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default FormGiay;
