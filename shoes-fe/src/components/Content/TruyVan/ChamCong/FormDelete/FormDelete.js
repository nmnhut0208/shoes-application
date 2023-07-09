import { useEffect, useState } from "react";
import styles from "./FormDelete.module.scss";

const FormDelete = ({ setShowModal }) => {
  const [MAKY, setMAKY] = useState("");
  const [infoKY, setInfoKY] = useState([]);
  console.log("record form: re-render", MAKY);

  const handleDelete = () => {
    if (MAKY === "") {
      alert("Mã kỳ không được để trống");
      return;
    } else {
      fetch("http://localhost:8000/delete_ky", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MAKY: MAKY,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          if (info["status"] === "success") {
            alert("Xóa thành công");
            setShowModal(false);
          } else {
            alert("Xóa thất bại");
          }
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/get_ky")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setInfoKY(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  const handleChangeInformationForm = (e) => {
    setMAKY(e.target.value);
  };

  return (
    <div className={styles.form}>
      <div className={styles.group_first}>
        <div className={styles.group_first_row}>
          <label>Mã kỳ</label>
          {/* <input
              value={inputForm["MAKY"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="MAKY"
              className={styles.item_size_small}
              readOnly={stateTable.inforShowTable.action_row === "edit"}
            /> */}
          <select value={MAKY} onChange={(e) => handleChangeInformationForm(e)}>
            <option value="">Chọn mã kỳ</option>
            {infoKY.map((item) => (
              <option value={item["MAKY"]}>{item["MAKY"]}</option>
            ))}
          </select>
        </div>
        {/* <div className={styles.group_first_row}>
            <label>Tên kỳ</label>
            <input
              value={inputForm["TENKY"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="TENKY"
              className={styles.item_size_big}
            />
          </div> */}
      </div>
      <div className={styles.group_button}>
        <div>
          <button onClick={handleDelete}>Xóa</button>
        </div>
      </div>
    </div>
  );
};

export default FormDelete;
