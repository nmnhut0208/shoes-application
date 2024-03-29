import { useState, useEffect, useMemo } from "react";
import moment from "moment";
import { convertDate } from "~utils/processing_date";

import { ItemKhachHang } from "~items";
import ModalForButton from "./ModalForButton";
import In from "./In";
import styles from "./FormThuTien.module.scss";
import { useTableContext, actions_table } from "~table_context";
import { useUserContext } from "~user";
import { handleDisableKeyDownUp, handleFocus } from "~utils/event";
import { CustomAlert } from "~utils/alert_custom";

const updateSOPHIEU = (sophieu) => {
  fetch("http://localhost:8000/hethong/phieuthu/SOPHIEU", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ LASTNUMBER: sophieu }),
  }).catch((error) => {
    console.log("error: ", error);
  });
};

const list_input_required = {
  MAKH: "Mã khách hàng",
  THANHTIEN: "Số tiền",
};

const FormThuTien = ({ dataView, type_action }) => {
  const [isSave, setIsSave] = useState(true);
  const view = useMemo(() => {
    if (type_action === "view") return true;
    else return false;
  }, []);
  const [stateTable, dispatchTable] = useTableContext();
  const [form, setForm] = useState({});
  const [lastestSOPHIEU, setLastestSOPHIEU] = useState(0);
  const [stateUser, dispatchUser] = useUserContext();
  const [showPrint, setShowPrint] = useState(false);

  const [maKH, setMaKH] = useState(form["MAKH"]);
  const [tenKH, setTenKH] = useState(form["TENKH"]);
  useEffect(() => {
    if (maKH !== form["MAKH"]) {
      setForm({
        ...form,
        MAKH: maKH,
        TENKH: tenKH,
      });
    }
  }, [maKH]);

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
            MAKH: "",
            TENKH: "",
            SOPHIEU: sophieu,
            NGAYPHIEU: moment()
              .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
              .format("YYYY-MM-DD HH:mm:ss"),
          });
          setLastestSOPHIEU(data["LastestSOPHIEU"]);
          setIsSave(true);
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
      setIsSave(true);
    }
  }, []);

  const handleChangeInformationForm = (dict_data) => {
    const data = { ...form, ...dict_data };
    setForm(data);
    setIsSave(false);
  };

  const handleChangeFormForTypeDate = (e) => {
    const data = { ...form };
    data[e.target.name] = moment(e.target.value, "YYYY-MM-DD")
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .format("YYYY-MM-DD HH:mm:ss");
    setForm(data);
    setIsSave(false);
  };

  const handleSaveFrom = () => {
    if (isSave) {
      return;
    }
    for (let key in list_input_required) {
      if (form[key] === undefined || form[key] === "") {
        CustomAlert("Nhập " + list_input_required[key]);
        return false;
      }
    }

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
        if (type_action === "add") {
          updateSOPHIEU(lastestSOPHIEU);
        }
        CustomAlert("Lưu thông tin thành công.");
        setIsSave(true);
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
      THANHTIEN: "",
      MAKH: "",
      TENKH: "",
      SOPHIEU: SOPHIEU_new,
      NGAYPHIEU: moment()
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .format("YYYY-MM-DD HH:mm:ss"),
    });
    setLastestSOPHIEU(lastestSOPHIEU + 1);
    setIsSave(true);
  };

  const handlePrint = () => {
    setShowPrint(true);
  };

  return (
    <div>
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
                readOnly={view}
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
              value={form["MAKH"]}
              setValue={setMaKH}
              label={form["TENKH"]}
              setLabel={setTenKH}
              size_input={"15rem"}
              size_span={"34.2rem"}
              have_span={true}
              readOnly={type_action !== "add"}
              size_selection={550}
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
              onKeyDown={handleDisableKeyDownUp}
              onKeyUp={handleDisableKeyDownUp}
              onFocus={handleFocus}
              className={styles.item_size_small}
              readOnly={view}
            />
          </div>
          <div className={styles.group_second_row}>
            <label>Diễn giải</label>
            <textarea
              name="DIENGIAIPHIEU"
              value={form["DIENGIAIPHIEU"]}
              onChange={(e) =>
                handleChangeInformationForm({ DIENGIAIPHIEU: e.target.value })
              }
              className={styles.item_size_big}
              style={{ width: "55rem" }}
              readOnly={view}
            />
          </div>
        </div>
        <div className={styles.group_button}>
          <div>
            <button onClick={handleSaveFrom} disabled={view}>
              Lưu
            </button>
            {type_action === "add" && (
              <button onClick={handleNhapTiep} disabled={!isSave}>
                Nhập tiếp
              </button>
            )}
            <button onClick={handlePrint} disabled={!isSave}>
              In
            </button>
          </div>
        </div>
      </div>
      {showPrint && (
        <ModalForButton status={showPrint} setShowModal={setShowPrint}>
          <In data={form} setShowModal={setShowPrint} />
        </ModalForButton>
      )}
    </div>
  );
};

export default FormThuTien;
