import { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";

import { ItemKhachHang } from "~items";
import styles from "./FormThuTien.module.scss";
import { useTableContext, actions_table } from "~table_context";
import { convertDate } from "~utils/processing_date";
import { useUserContext } from "~user";

const FormThuTien = ({ dataView, type_action }) => {
  const [stateTable, dispatchTable] = useTableContext();
  const [form, setForm] = useState({});
  const [lastestSOPHIEU, setLastestSOPHIEU] = useState(0);
  const [stateUser, dispatchUser] = useUserContext();
  console.log("form hhe: ", form);
  useEffect(() => {
    if (!dataView) {
      // get SOPHIEU
      fetch("http://localhost:8000/hethong/phieuthu/SOPHIEU")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let sophieu = data["SOPHIEU"];
          setForm({
            ...form,
            NGUOITAO: stateUser.userName,
            NGUOISUA: stateUser.userName,
            DIENGIAIPHIEU: "",
            SOPHIEU: sophieu,
            NGAYPHIEU: moment().format("YYYY-MM-DD HH:mm:ss"),
          });
          setLastestSOPHIEU(data["LastestDH"]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // load data from dataView
      // TODO
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
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  return (
    <div className={styles.form}>
      <div className={styles.group_first}>
        <div className={styles.group_first_row}>
          <div className="styles.group_first_row_between">
            <label>Số phiếu</label>
            <input
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
            initValue={{ MAKH: form["MAKH"] }}
            changeData={(data) => {
              handleChangeInformationForm(data);
            }}
            size_input={"15rem"}
            size_span={"29.7rem"}
            have_span={true}
            // readOnly={view}
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
          <button>Nhập tiếp</button>
          <button>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default FormThuTien;
