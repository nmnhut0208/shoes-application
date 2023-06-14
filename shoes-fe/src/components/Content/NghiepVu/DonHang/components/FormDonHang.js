import { useEffect, useState, useMemo } from "react";
import moment from "moment";

import { useUserContext } from "~user";
import { INFO_COLS_DONHANG } from "./ConstantVariable";
import Modal from "./Modal";
import { renderDataEmpty } from "~utils/processing_data_table";

import TableDonHang from "./TableDonHang";
import FormGiay from "./FormGiay";
import FormMau from "./FormMau";
import DanhMucGiayKhachHang from "./DanhMucGiayKhachHang";

import styles from "./FormDonHang.module.scss";
import {
  updateSODH,
  updateDanhSachMau,
  saveDonDatHang,
  updateFormDonHang,
  updateColumnsInformations,
} from "./helper";
import { ItemKhachHang } from "~items";
import { convertDate } from "~utils/processing_date";

const FormDonHang = ({
  dataView,
  setShowModalNghiepVuDonHang,
  setIsSaveDataNghiepVuDonHang,
  permission,
}) => {
  const view = useMemo(() => {
    if (permission && permission.THEM === 0 && permission.SUA === 0)
      return true;
    else return false;
  }, []); // chinh lai theo phancong

  const [stateUser, dispatchUser] = useUserContext();

  // NOTE: ko biết cách vẫn show ra núp edit khi ko có data
  // nên đành để thành thêm 1 dòng trống sau dataTable
  const [dataTable, setDataTable] = useState(() => {
    return renderDataEmpty(INFO_COLS_DONHANG, 1);
  });
  const [isUpdateFromDataView, setIsUpdateFromDataView] = useState(false);

  const [dataMau, setDataMau] = useState([]);
  const [isSavedData, setIsSavedData] = useState(true);

  const [formInfoDonHang, setFormInfoDonHang] = useState({
    SODH: "",
    NGUOITAO: stateUser.userName,
    DIENGIAIPHIEU: "",
    NGAYDH: "",
    NGAYGH: "",
  });
  console.log("formInfoDonHang: ", formInfoDonHang);
  const [lastestDH, setLastestDH] = useState(0);

  const [infoFormWillShow, setInfoFormWillShow] = useState({
    giay: false,
    mau: false,
    dmGiaykh: false,
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    updateDanhSachMau(setDataMau);
  }, []); // them dieu kieu check mau thay doi

  useEffect(() => {
    if (dataView) {
      fetch(
        "http://localhost:8000/donhang?SODH=" +
          encodeURIComponent(dataView["SODH"])
      )
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          setIsUpdateFromDataView(true);
          setDataTable([...info, dataTable[dataTable.length - 1]]);
          setFormInfoDonHang({
            SODH: info[0]["SODH"],
            NGAYDH: info[0]["NGAYDH"],
            NGAYGH: info[0]["NGAYGH"],
            MAKH: info[0]["MAKH"],
            TENKH: info[0]["TENKH"],
            DIENGIAIPHIEU: info[0]["DIENGIAIPHIEU"],
          });
          setIsSavedData(true);
          console.log(dataTable);
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    } else {
      updateFormDonHang(formInfoDonHang, setFormInfoDonHang, setLastestDH);
    }
  }, [dataView]);

  const handleChangeForm = (e) => {
    const data = { ...formInfoDonHang };
    data[e.target.name] = e.target.value;
    setFormInfoDonHang(data);
    setIsSavedData(false);
    if (setIsSaveDataNghiepVuDonHang) setIsSaveDataNghiepVuDonHang(false);
  };

  const handleChangeFormForTypeDate = (e) => {
    const data = { ...formInfoDonHang };
    data[e.target.name] = moment(e.target.value, "YYYY-MM-DD").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    setFormInfoDonHang(data);
    setIsSavedData(false);
    if (setIsSaveDataNghiepVuDonHang) setIsSaveDataNghiepVuDonHang(false);
  };

  const handleThemGiay = () => {
    setInfoFormWillShow({
      giay: true,
      mau: false,
      dmGiaykh: false,
    });
    setShowModal(true);
  };

  const handleThemMau = () => {
    setInfoFormWillShow({
      giay: false,
      mau: true,
      dmGiaykh: false,
    });
    setShowModal(true);
  };

  const handleNhapTiep = () => {
    if (!isSavedData) {
      alert("Lưu thông tin trước khi reset page!");
      return;
    }
    updateFormDonHang(formInfoDonHang, setFormInfoDonHang, setLastestDH);
    setDataTable(renderDataEmpty(INFO_COLS_DONHANG, 1));
    setIsSavedData(true);
    if (setIsSaveDataNghiepVuDonHang) setIsSaveDataNghiepVuDonHang(true);
  };

  const handleSaveDonHang = () => {
    if (isSavedData) return;

    let dataDatHang = dataTable.slice(0, dataTable.length - 1);
    // remove the last empty line
    dataDatHang = dataDatHang.filter((data) => data["SOLUONG"] > 0);
    if (dataDatHang.length == 0) {
      alert("Bạn chưa đặt hàng hoặc chưa chọn số lượng mỗi loại giày cần đặt!");
      return;
    } else {
      saveDonDatHang(formInfoDonHang, dataDatHang);
      if (!dataView) {
        console.log("updateSODH(lastestDH);: ");
        updateSODH(lastestDH);
      }
      setIsSavedData(true);
      if (setIsSaveDataNghiepVuDonHang) setIsSaveDataNghiepVuDonHang(true);
    }
  };

  const handleClickMaGiay = () => {
    setInfoFormWillShow({
      giay: false,
      mau: false,
      dmGiaykh: true,
    });
    setShowModal(true);
  };

  const infoColumns = useMemo(() => {
    return updateColumnsInformations(dataMau, dataTable, setDataTable, view);
  }, [dataTable, dataMau]);

  useEffect(() => {
    if (dataTable.length > 1) {
      if (isUpdateFromDataView) {
        // Để lần update đầu tiên từ dataView thì trạng thái của page
        // vẫn là chưa thay đổi => có thể đóng page mà ko cần save
        setIsSavedData(true);
        if (setIsSaveDataNghiepVuDonHang) setIsSaveDataNghiepVuDonHang(true);
        setIsUpdateFromDataView(false);
      } else {
        setIsSavedData(false);
        if (setIsSaveDataNghiepVuDonHang) setIsSaveDataNghiepVuDonHang(false);
      }
    } else {
      setIsSavedData(true);
      if (setIsSaveDataNghiepVuDonHang) setIsSaveDataNghiepVuDonHang(true);
    }
  }, [dataTable]);

  const handleDongForm = () => {
    console.log("ne: ", isSavedData);
    if (!isSavedData) {
      alert("Lưu thông tin thay đổi trước khi đóng");
      return;
    }
    if (setShowModalNghiepVuDonHang) setShowModalNghiepVuDonHang(false);
  };

  return (
    <>
      <div className={styles.form}>
        <div className={styles.group_item}>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label>Số đơn hàng</label>
              <input
                name="SODH"
                value={formInfoDonHang["SODH"]}
                onChange={(e) => handleChangeForm(e)}
                readOnly={true}
              />
            </div>
          </div>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label>Mã khách hàng</label>
              <ItemKhachHang
                initValue={{
                  MAKH: formInfoDonHang["MAKH"],
                  TENKH: formInfoDonHang["TENKH"],
                }}
                changeData={(data) => {
                  setFormInfoDonHang({ ...formInfoDonHang, ...data });
                }}
                size_input={"15rem"}
                size_span={"29.7rem"}
                have_span={true}
                readOnly={view}
              />
            </div>
          </div>
          <input
            type="checkbox"
            name="Giá lẻ"
            // value="true"
            value={formInfoDonHang["Giá lẻ"]}
            onChange={(e) => handleChangeForm(e)}
            readOnly={view}
            className={styles.checkbox}
          />
          <span for="Giá lẻ" className={styles.span_for_checkbox}>
            Giá lẻ
          </span>
        </div>
        <div className={styles.group_item}>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label>Ngày đơn hàng</label>
              <input
                type="date"
                name="NGAYDH"
                value={convertDate(formInfoDonHang["NGAYDH"])}
                onChange={(e) => handleChangeFormForTypeDate(e)}
                readOnly={view}
              />
            </div>
            <div className={styles.pair}>
              <label>Ngày giao hàng</label>
              <input
                type="date"
                name="NGAYGH"
                value={convertDate(formInfoDonHang["NGAYGH"])}
                onChange={(e) => handleChangeFormForTypeDate(e)}
                readOnly={view}
              />
            </div>
          </div>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label className={styles.label_for_textatea}>Diễn dãi</label>
              <textarea
                name="DIENGIAIPHIEU"
                value={formInfoDonHang["DIENGIAIPHIEU"]}
                onChange={(e) => handleChangeForm(e)}
                readOnly={view}
              />
            </div>
          </div>
        </div>
      </div>
      {
        <TableDonHang
          columns={infoColumns}
          data={dataTable}
          setDataTable={setDataTable}
          handleAddGiay={handleClickMaGiay}
          readOnly={view}
        />
      }
      <div className={styles.form}>
        {/* Không hiểu tại sao gộp 2 form lại thì ko nhận extend nên phải tách đỡ ra vầy */}
        <div className={styles.group_button}>
          <button onClick={handleThemGiay}>Thêm giày</button>
          <button onClick={handleThemMau}>Thêm màu</button>
          {permission.THEM === 1 && (
            <button onClick={handleNhapTiep}>Nhập tiếp</button>
          )}
          {!view && <button onClick={handleSaveDonHang}>Lưu</button>}
          {permission.IN === 1 && <button>In</button>}
          <button onClick={handleDongForm}>Đóng</button>
        </div>
      </div>
      {infoFormWillShow["giay"] && (
        <Modal
          title="Giày - F0025"
          status={showModal}
          setShowModal={setShowModal}
        >
          <FormGiay setShowModal={setShowModal} />
        </Modal>
      )}
      {!view && infoFormWillShow["mau"] && (
        <Modal
          title="Màu sắc - F0010"
          status={showModal}
          setShowModal={setShowModal}
        >
          <FormMau
            dataMau={dataMau}
            setDataMau={setDataMau}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
      {!view && infoFormWillShow["dmGiaykh"] && (
        <Modal
          title="Danh mục giày của Khách hàng - F0049"
          status={showModal}
          setShowModal={setShowModal}
        >
          <DanhMucGiayKhachHang
            MAKH={formInfoDonHang["MAKH"]}
            dataOrigin={dataTable}
            setInfoSelection={setDataTable}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
};

export default FormDonHang;
