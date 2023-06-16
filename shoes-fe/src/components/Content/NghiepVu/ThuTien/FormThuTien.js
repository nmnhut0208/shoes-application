import { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";

import { ItemKhachHang } from "~items";
import styles from "./FormThuTien.module.scss";
import { useTableContext, actions_table } from "~table_context";
import { convertDate } from "~utils/processing_date";
import { useUserContext } from "~user";

const updateSOPHIEU = (sophieu) => {
  console.log("save so don hang");
  fetch("http://localhost:8000/hethong/phieuthu/SOPHIEU", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ LASTNUMBER: sophieu }),
  }).catch((error) => {
    console.log("error: ", error);
  });
};

const FormThuTien = ({ dataView, type_action }) => {
  const [stateTable, dispatchTable] = useTableContext();
  const [form, setForm] = useState({});
  const [lastestSOPHIEU, setLastestSOPHIEU] = useState(0);
  const [stateUser, dispatchUser] = useUserContext();
  console.log("form hhe: ", form);
  useEffect(() => {
    if (!dataView) {
      fetch("http://localhost:8000/hethong/phieuthu/SOPHIEU")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let sophieu = data["SOPHIEU"];
          setForm({
            NGUOITAO: stateUser.userName,
            NGUOISUA: stateUser.userName,
            DIENGIAIPHIEU: "",
            SOPHIEU: sophieu,
            NGAYPHIEU: moment().format("YYYY-MM-DD HH:mm:ss"),
          });
          setLastestSOPHIEU(data["LastestSOPHIEU"]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // load data from dataView
      setForm({
        ...dataView,
        THANHTIEN: dataView["SODUCUOI"],
        NGUOITAO: stateUser.userName,
        NGUOISUA: stateUser.userName,
      });
    }
  }, []);

  const handleChangeInformationForm = (dict_data) => {
    const data = { ...form, ...dict_data };
    setForm(data);
  };

  const handleChangeFormForTypeDate = (e) => {
    const data = { ...form };
    data[e.target.name] = moment(e.target.value, "YYYY-MM-DD").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    setForm(data);
  };

  const handleSaveFrom = () => {
    console.log("Save form");
    let method = "";
    if (type_action === "edit") {
      method = "PUT";
    } else if (type_action === "add") {
      method = "POST";
    }
    fetch("http://localhost:8000/congno/phieuthu", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => {
        console.log("response: ", response);
        if (type_action === "add") {
          updateSOPHIEU(lastestSOPHIEU);
        }
        alert("Lưu thông tin thành công.");
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const handleNhapTiep = () => {
    let SOPHIEU_old = form["SOPHIEU"];
    const sub_components = SOPHIEU_old.split("-");
    const str_number = ("000" + (lastestSOPHIEU + 1)).slice(-4);
    const SOPHIEU_new =
      sub_components[0] + "-" + str_number + "-" + sub_components[2];
    setForm({
      SOPHIEU: SOPHIEU_new,
      NGUOITAO: stateUser.userName,
      NGUOISUA: stateUser.userName,
      DIENGIAIPHIEU: "",
      SOPHIEU: SOPHIEU_new,
      NGAYPHIEU: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    setLastestSOPHIEU(lastestSOPHIEU + 1);
  };

  return (
    <div className={styles.form}>
      <div className={styles.group_first}>
        <div className={styles.group_first_row}>
          <div className="styles.group_first_row_between">
            <label>Số phiếu</label>
            <input
              readOnly={true}
              name="SOPHIEU"
              value={form["SOPHIEU"]}
              className={styles.item_size_small}
            />
          </div>
          <div className="styles.group_first_row_between">
            <label>Ngày phiếu</label>
            <input
              type="date"
              name="NGAYPHIEU"
              value={convertDate(form["NGAYPHIEU"])}
              onChange={handleChangeFormForTypeDate}
              className={styles.item_size_small}
            />
          </div>
        </div>
      </div>
      <div className={styles.group_second}>
        <div className={styles.group_second_row}>
          <label>Khách hàng</label>
          <ItemKhachHang
            initValue={{ MAKH: form["MAKH"], TENKH: form["TENKH"] }}
            changeData={(data) => {
              handleChangeInformationForm(data);
            }}
            size_input={"15rem"}
            size_span={"29.7rem"}
            have_span={true}
            readOnly={type_action !== "add"}
          />
        </div>
        <div className={styles.group_second_row}>
          <label>Số tiền</label>
          <input
            type="number"
            min={0}
            name="THANHTIEN"
            value={form["THANHTIEN"]}
            onChange={(e) =>
              handleChangeInformationForm({ THANHTIEN: e.target.value })
            }
            className={styles.item_size_small}
          />
        </div>
        <div className={styles.group_second_row}>
          <label>Diễn giải</label>
          <input
            name="DIENGIAIPHIEU"
            value={form["DIENGIAIPHIEU"]}
            onChange={(e) =>
              handleChangeInformationForm({ DIENGIAIPHIEU: e.target.value })
            }
            className={styles.item_size_big}
          />
        </div>
      </div>
      <div className={styles.group_button}>
        <div>
          <button onClick={handleSaveFrom}>Lưu</button>
          {type_action === "add" && (
            <button onClick={handleNhapTiep}>Nhập tiếp</button>
          )}
          {/* <button>Đóng</button> */}
        </div>
      </div>
    </div>
  );
};

export default FormThuTien;
