import { useState, useMemo } from "react";
import { Modal } from "~nghiep_vu/DonHang";
import { ModalForm } from "./Modal";
import styles from "./CongNo.module.scss";
import { ItemKhachHang } from "~items";
import moment from "moment";
import { convertDate } from "~utils/processing_date";
import { useItemsContext } from "~items_context";
import FormXem from "./FormXem";

const CongNo = () => {
  const [statusModal, setStatusModal] = useState(true);
  const [statusModalXem, setStatusModalXem] = useState(false);
  const [stateItem, dispatchItem] = useItemsContext();
  const [form, setForm] = useState({
    KhachHangFrom: stateItem.infoItemKhachHang[0]["MAKH"],
    KhachHangTo:
      stateItem.infoItemKhachHang[stateItem.infoItemKhachHang.length - 1][
        "MAKH"
      ],
    DATE_FROM: moment().format("YYYY-MM-DD HH:mm:ss"),
    DATE_TO: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  const handleChangeInformationForm = (dict_data) => {
    const data = { ...form, ...dict_data };
    setForm(data);
  };

  console.log("form: ", form);

  // const handlePrint = () => {
  //   setStatusModalIn(true);
  // };

  const handleXem = () => {
    setStatusModalXem(true);
  };

  return (
    <>
      <Modal
        title="Báo cáo Công Nợ - F0056"
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
                initValue={{ MAKH: form["KhachHangFrom"], TENKH: "" }}
                changeData={(data) => {
                  handleChangeInformationForm({ KhachHangFrom: data["MAKH"] });
                }}
                size_input={"15rem"}
                have_span={false}
              />
            </div>
            <div className={styles.item}>
              <label>Đến khách hàng</label>
              <ItemKhachHang
                initValue={{ MAKH: form["KhachHangTo"], TENKH: "" }}
                changeData={(data) => {
                  handleChangeInformationForm({ KhachHangTo: data["MAKH"] });
                }}
                size_input={"15rem"}
                have_span={false}
              />
            </div>
          </div>
          <div className={styles.group_button}>
            <button onClick={handleXem}>Xem Chi Tiết</button>
          </div>
        </div>

        {statusModalXem && (
          <ModalForm setShowForm={setStatusModalXem}>
            <FormXem data={form} setShowModal={setStatusModalXem} />
          </ModalForm>
        )}
      </Modal>
    </>
  );
};

export default CongNo;
