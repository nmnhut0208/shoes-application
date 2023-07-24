import { useState, useEffect } from "react";
import { useTableContext, actions_table } from "~table_context";
import styles from "./FormPhanQuyen.module.scss";

const FormPhanQuyen = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);
  const [typeForm, setTypeForm] = useState([]);
  const [maNV, setMaNV] = useState([]);
  const readOnly =
    stateTable.inforShowTable.action_row === "edit" ? true : false;
  console.log("phan quyen:", inputForm);

  const handleChangeInformationForm = (e) => {
    if (e.target.name === "MAFORM") {
      const data = { ...inputForm };
      data[e.target.name] = e.target.value;
      const type = typeForm.filter((info) => info["MAFORM"] === e.target.value);
      data["TENFORM"] = type[0]["TENFORM"];
      setInputForm(data);
    } else {
      const data = { ...inputForm };
      data[e.target.name] = e.target.value;
      setInputForm(data);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/getform")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log("info: ", info);
        setTypeForm(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/nhanvien")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log("info: ", info);
        setMaNV(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  const handleSaveFrom = () => {
    // keys of inputForm !== ""
    if (
      Object.keys(inputForm).some((key) => inputForm[key] === "") ||
      inputForm["MANVIEN"] === "Chọn Nhân Viên" ||
      inputForm["MAFORM"] === "Chọn Form"
    ) {
      // alert with key === ""
      alert("Vui lòng nhập đầy đủ thông tin!");
    }

    // saveDataBase()
    if (
      stateTable.inforShowTable.action_row === "edit" &&
      Object.keys(inputForm).every((key) => inputForm[key] !== "") &&
      inputForm["MANVIEN"] !== "Chọn Nhân Viên" &&
      inputForm["MAFORM"] !== "Chọn Form"
    ) {
      fetch("http://localhost:8000/phanquyen", {
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
            info["MANVIEN"] === inputForm["MANVIEN"] &&
            info["MAFORM"] === inputForm["MAFORM"]
              ? inputForm
              : info
          )
        )
      );
      dispatchTable(actions_table.setModeShowModal(false));
    } else if (
      stateTable.inforShowTable.action_row === "add" &&
      Object.keys(inputForm).every((key) => inputForm[key] !== "") &&
      inputForm["MANVIEN"] !== "Chọn Nhân Viên" &&
      inputForm["MAFORM"] !== "Chọn Form"
    ) {
      // console.log("inputForm phan quyen: ", inputForm);
      fetch("http://localhost:8000/check_exist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          MANVIEN: inputForm["MANVIEN"],
          MAFORM: inputForm["MAFORM"],
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          console.log("info: ", info);
          if (info["status"] === "exist") {
            alert("Đã tồn tại!");
          } else {
            fetch("http://localhost:8000/phanquyen", {
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
            dispatchTable(actions_table.setModeShowModal(false));
          }
        });
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.form_group}>
        <div className={styles.form_group_first}>
          <label>Mã Nhân Viên</label>
          {!readOnly && (
            <select
              value={inputForm["MANVIEN"]}
              readOnly={readOnly}
              onChange={(e) => handleChangeInformationForm(e)}
              name="MANVIEN"
              className={styles.item_size_big}
            >
              <option value="">Chọn Nhân Viên</option>
              {maNV.map((nv) => (
                <option value={nv["MANVIEN"]}>{nv["MANVIEN"]}</option>
              ))}
            </select>
          )}
        </div>
        <div className={styles.form_group_first}>
          <label>Tên Form</label>
          {readOnly && (
            <input
              value={inputForm["TENFORM"]}
              readOnly={readOnly}
              // onChange={(e) => handleChangeInformationForm(e)}
              name="TENFORM"
              className={styles.item_size_big}
            />
          )}
          {!readOnly && (
            <select
              value={inputForm["MAFORM"]}
              readOnly={readOnly}
              name="MAFORM"
              onChange={(e) => handleChangeInformationForm(e)}
              className={styles.item_size_big}
            >
              <option value="">Chọn Form</option>
              {typeForm.map((form) => (
                <option value={form["MAFORM"]}>{form["TENFORM"]}</option>
              ))}
            </select>
          )}
        </div>
        {/* <div className={styles.form_group_first}>
            <label>Tên Form</label>
            <input
              value={inputForm["TENFORM"]}
              onChange={(e) => handleChangeInformationForm(e)}
              name="TENFORM"
              className={styles.item_size_big}
            />
          </div> */}
        <div className={styles.form_group_first}>
          <label>Thêm</label>
          <input
            value={inputForm["THEM"]}
            onChange={(e) => handleChangeInformationForm(e)}
            name="THEM"
            className={styles.item_size_small}
            type="number"
            min={0}
            max={1}
          />
        </div>
        <div className={styles.form_group_first}>
          <label>Sửa</label>
          <input
            value={inputForm["SUA"]}
            onChange={(e) => handleChangeInformationForm(e)}
            name="SUA"
            className={styles.item_size_small}
            type="number"
            min={0}
            max={1}
          />
        </div>
        <div className={styles.form_group_first}>
          <label>Xóa</label>
          <input
            value={inputForm["XOA"]}
            onChange={(e) => handleChangeInformationForm(e)}
            name="XOA"
            className={styles.item_size_small}
            type="number"
            min={0}
            max={1}
          />
        </div>
        <div className={styles.form_group_first}>
          <label>Xem</label>
          <input
            value={inputForm["XEM"]}
            onChange={(e) => handleChangeInformationForm(e)}
            name="XEM"
            className={styles.item_size_small}
            type="number"
            min={0}
            max={1}
          />
        </div>
        <div className={styles.form_group_first}>
          <label>In</label>
          <input
            value={inputForm["IN"]}
            onChange={(e) => handleChangeInformationForm(e)}
            name="IN"
            className={styles.item_size_small}
            type="number"
            min={0}
            max={1}
          />
        </div>
      </div>
      <div className={styles.form_button}>
        <button onClick={handleSaveFrom}>Lưu</button>
      </div>
    </div>
  );
};

export default FormPhanQuyen;
