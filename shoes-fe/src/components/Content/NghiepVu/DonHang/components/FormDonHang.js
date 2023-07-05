import { useEffect, useState, useMemo } from "react";

import { useUserContext } from "~user";
import { INFO_COLS_DONHANG } from "./ConstantVariable";
import Modal from "./Modal";
import { renderDataEmpty } from "~utils/processing_data_table";

import FormInfoDonHang from "./FormInfoDonHang";
import TableDonHang from "./TableDonHang";
import FormGiay from "./FormGiay";
import FormMau from "./FormMau";
import DanhMucGiayKhachHang from "./DanhMucGiayKhachHang";
import InDonHang from "./InDonHang";

import styles from "./FormDonHang.module.scss";
import {
  updateSODH,
  updateDanhSachMau,
  saveDonDatHang,
  updateFormDonHang,
  updateColumnsInformations,
} from "./helper";

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
  }, []);

  const [stateUser, dispatchUser] = useUserContext();

  // NOTE: ko biết cách vẫn show ra núp edit khi ko có data
  // nên đành để thành thêm 1 dòng trống sau dataTable
  // const [dataTable, setDataTable] = useState(() => {
  //   return renderDataEmpty(INFO_COLS_DONHANG, 1);
  // });
  const [dataTable, setDataTable] = useState([]);
  const [isUpdateFromDataView, setIsUpdateFromDataView] = useState(false);

  const [dataMau, setDataMau] = useState([]);
  const [isSavedData, setIsSavedData] = useState(true);

  const [formInfoDonHang, setFormInfoDonHang] = useState({
    SODH: "",
    NGUOITAO: stateUser.userName,
    DIENGIAIPHIEU: "",
    NGAYDH: "",
    NGAYGH: "",
    MAKH: "",
  });
  console.log("formInfoDonHang: ", formInfoDonHang);
  const [lastestDH, setLastestDH] = useState(0);

  const [infoFormWillShow, setInfoFormWillShow] = useState({
    giay: false,
    mau: false,
    dmGiaykh: false,
    inDonHang: false,
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
          setDataTable(info);
          // setDataTable([...info, dataTable[dataTable.length - 1]]);
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

  const handleThemGiay = () => {
    setInfoFormWillShow({
      giay: true,
      mau: false,
      dmGiaykh: false,
      inDonHang: false,
    });
    setShowModal(true);
  };

  const handleThemMau = () => {
    setInfoFormWillShow({
      giay: false,
      mau: true,
      dmGiaykh: false,
      inDonHang: false,
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

    // let dataDatHang = dataTable.slice(0, dataTable.length - 1);
    // remove the last empty line

    let dataDatHang = dataTable.filter((data) => data["SOLUONG"] > 0);
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
    if (formInfoDonHang["MAKH"] === "") {
      alert("Vui lòng chọn khách hàng!");
      return;
    }
    setInfoFormWillShow({
      giay: false,
      mau: false,
      dmGiaykh: true,
      inDonHang: false,
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

  const handleInDonHang = () => {
    if (dataTable.length == 0) return;
    console.log("handleInDonHang: handleInDonHang");
    // TODO: handle In DonHang
    setInfoFormWillShow({
      giay: false,
      mau: false,
      dmGiaykh: false,
      inDonHang: true,
    });
    setShowModal(true);
  };

  const handleDongForm = () => {
    console.log("ne: ", isSavedData);
    if (!isSavedData) {
      alert("Lưu thông tin thay đổi trước khi đóng");
      return;
    }
    if (setShowModalNghiepVuDonHang) setShowModalNghiepVuDonHang(false);
  };

  console.log("infoFormWillShow: ", infoFormWillShow);
  console.log("dataTable: ", dataTable);

  return (
    <>
      <FormInfoDonHang
        formInfoDonHang={formInfoDonHang}
        setFormInfoDonHang={setFormInfoDonHang}
        setIsSavedData={setIsSavedData}
        setIsSaveDataNghiepVuDonHang={setIsSaveDataNghiepVuDonHang}
        view={view}
      />
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
          <button
            onClick={handleInDonHang}
            disabled={permission.IN === 0 || dataTable.length == 0}
          >
            In
          </button>

          <button onClick={handleNhapTiep} disabled={permission.THEM === 0}>
            Nhập tiếp
          </button>
          <button onClick={handleSaveDonHang} disabled={view}>
            Lưu
          </button>
          <button onClick={handleThemGiay} disabled={view}>
            Thêm giày
          </button>
          <button onClick={handleThemMau} disabled={view}>
            Thêm màu
          </button>

          {/* <button onClick={handleDongForm}>Đóng</button> */}
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
      {infoFormWillShow["inDonHang"] && (
        <Modal
          title="In Đơn Hàng"
          status={showModal}
          setShowModal={setShowModal}
          // without_close_button={true}
        >
          <InDonHang
            infoHeader={formInfoDonHang}
            dataTable={dataTable}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
};

export default FormDonHang;
