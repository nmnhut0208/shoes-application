import { useState, useEffect } from "react";
import { Modal } from "~nghiep_vu/DonHang";
import styles from "./DonHang.module.scss";
import { ItemKhachHang } from "~items";
import moment from "moment";
import { convertDate } from "~utils/processing_date";
import { useItemsContext } from "~items_context";
import In from "./In";

const DonHang = () => {
  const [statusModal, setStatusModal] = useState(true);
  const [statusModalIn, setStatusModalIn] = useState(false);
  const [stateItem, dispatchItem] = useItemsContext();
  const [stylePrint, setStylePrint] = useState({});

  const [form, setForm] = useState({
    KhachHangFrom: stateItem.infoItemKhachHang[0]["MAKH"],
    KhachHangTo:
      stateItem.infoItemKhachHang[stateItem.infoItemKhachHang.length - 1][
        "MAKH"
      ],
    DATE_FROM: moment().format("YYYY-MM-DD HH:mm:ss"),
    DATE_TO: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  const [khachHangFromValue, setKhachHangFromValue] = useState("");
  useEffect(() => {
    setForm({
      ...form,
      KhachHangFrom: khachHangFromValue,
    });
  }, [khachHangFromValue]);

  const [khachHangToValue, setKhachHangToValue] = useState("");
  useEffect(() => {
    setForm({
      ...form,
      KhachHangTo: khachHangToValue,
    });
  }, [khachHangToValue]);
  console.log(form);

  const handleChangeInformationForm = (dict_data) => {
    const data = { ...form, ...dict_data };
    setForm(data);
  };

  console.log("form: ", form);

  const handlePrint = () => {
    setStylePrint({});
    setStatusModalIn(true);
  };

  const handleView = () => {
    setStylePrint({
      "scroll-behavior": "smooth",
      "overflow-y": "overlay",
      "overflow-x": "hidden",
      height: "600px",
      width: "120rem",
    });
    setStatusModalIn(true);
  };

  return (
    <>
      <Modal
        title="Báo cáo Đơn Hàng - F0051"
        status={statusModal}
        isSaveData={true}
        setShowModal={setStatusModal}
        isResetPageEmpty={true}
      >
        <div className={styles.form}>
          <div className={styles.part}>
            <div className={styles.item}>
              <label>Từ ngày</label>
              <input
                type="date"
                value={convertDate(form["DATE_FROM"])}
                onChange={(e) => {
                  handleChangeInformationForm({
                    DATE_FROM: moment(e.target.value, "YYYY-MM-DD").format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                  });
                }}
              />
            </div>

            <div className={styles.item}>
              <label>Đến ngày</label>
              <input
                type="date"
                value={convertDate(form["DATE_TO"])}
                onChange={(e) => {
                  handleChangeInformationForm({
                    DATE_TO: moment(e.target.value, "YYYY-MM-DD").format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                  });
                }}
              />
            </div>
          </div>
          <div className={styles.part}>
            <div className={styles.item}>
              <label>Từ khách hàng</label>
              <ItemKhachHang
                value={khachHangFromValue}
                setValue={setKhachHangFromValue}
                size_input={"15rem"}
                have_span={false}
              />
            </div>
            <div className={styles.item}>
              <label>Đến khách hàng</label>
              <ItemKhachHang
                value={khachHangToValue}
                setValue={setKhachHangToValue}
                size_input={"15rem"}
                have_span={false}
              />
            </div>
          </div>
          <div className={styles.group_button}>
            <button onClick={handlePrint}>In</button>
            <button onClick={handleView}>Xem</button>
          </div>
        </div>

        <Modal
          title="In thông tin đơn hàng tổng hợp"
          status={statusModalIn}
          isSaveData={true}
          setShowModal={setStatusModalIn}
          isResetPageEmpty={false}
        >
          <In
            data={form}
            setShowModal={setStatusModalIn}
            stylePrint={stylePrint}
          />
        </Modal>
      </Modal>
    </>
  );
};

export default DonHang;
