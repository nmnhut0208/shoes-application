import { useEffect, useState, useMemo, memo } from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useUserContext } from "~user";
import Modal from "./Modal";

import FormInfoDonHang from "./FormInfoDonHang";
import TableDonHang from "./TableDonHang";
import FormGiay from "./FormGiay";
import FormMau from "./FormMau";
import DanhMucGiayKhachHang from "./DanhMucGiayKhachHang";
import InDonHang from "./InDonHang";

import styles from "./FormDonHang.module.scss";
import { renderDataEmpty } from "~utils/processing_data_table";
import {
  updateSODH,
  updateDanhSachMau,
  saveDonDatHang,
  updateFormDonHang,
  updateColumnsInformations,
} from "./helper";

import { INFO_COLS_DONHANG } from "./ConstantVariable";

const FormDonHang = ({ dataView, isSaveData, setIsSaveData, permission }) => {
  const view = useMemo(() => {
    if (permission && permission.THEM === 0 && permission.SUA === 0)
      return true;
    else return false;
  }, []);

  const [stateUser, dispatchUser] = useUserContext();
  const [dataTable, setDataTable] = useState([]);

  const [dataMau, setDataMau] = useState([]);

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
  const [listGiayUnique, setListGiayUnique] = useState([]);
  const [listGiayKH, setListGiayKH] = useState([]);

  useEffect(() => {
    if (formInfoDonHang["MAKH"] !== "") {
      fetch(
        "http://localhost:8000/donhang/giay_unique/" + formInfoDonHang["MAKH"]
      )
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          console.log("GiayKH", info);
          setListGiayUnique(info);
        })
        .catch((err) => {
          console.log(":error: ", err);
        });

      fetch(
        "http://localhost:8000/donhang/khachhang/" +
          formInfoDonHang["MAKH"] +
          "/giay"
      )
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          console.log(info);
          setListGiayKH(info);
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    }
  }, [formInfoDonHang["MAKH"]]);

  // useEffect(() => {
  //   updateDanhSachMau(setDataMau);
  // }, []); // them dieu kieu check mau thay doi

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
          setDataTable([...info, renderDataEmpty(INFO_COLS_DONHANG, 1)[0]]);
          setFormInfoDonHang({
            SODH: info[0]["SODH"],
            NGAYDH: info[0]["NGAYDH"],
            NGAYGH: info[0]["NGAYGH"],
            MAKH: info[0]["MAKH"],
            TENKH: info[0]["TENKH"],
            DIENGIAIPHIEU: info[0]["DIENGIAIPHIEU"],
          });
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    } else {
      updateFormDonHang(formInfoDonHang, setFormInfoDonHang, setLastestDH);
      setDataTable(renderDataEmpty(INFO_COLS_DONHANG, 1));
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
    if (!isSaveData) {
      alert("Lưu thông tin trước khi reset page!");
      return;
    }
    updateFormDonHang(formInfoDonHang, setFormInfoDonHang, setLastestDH);
    setDataTable([]);
    setListGiayKH([]);
    setListGiayUnique([]);
    setIsSaveData(true);
  };

  const handleSaveDonHang = () => {
    if (isSaveData) return;

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
      setIsSaveData(true);
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
    return updateColumnsInformations(
      dataTable,
      setDataTable,
      view,
      listGiayUnique,
      setIsSaveData
    );
  }, [dataTable, listGiayUnique]);

  useEffect(() => {
    let _data = dataTable.filter((row) => row.SOLUONG > 0);
    if (_data.length > 0) {
      setIsSaveData(false);
    }
  }, [formInfoDonHang]);

  const handleInDonHang = () => {
    if (dataTable.length == 0) return;
    setInfoFormWillShow({
      giay: false,
      mau: false,
      dmGiaykh: false,
      inDonHang: true,
    });
    setShowModal(true);
  };

  return (
    <div className={styles.page}>
      <FormInfoDonHang
        formInfoDonHang={formInfoDonHang}
        setFormInfoDonHang={setFormInfoDonHang}
        view={view}
      />
      <Tooltip arrow title="Add">
        <IconButton onClick={handleClickMaGiay}>
          <AddCircleIcon style={{ color: "green", fontSize: "3rem" }} />
        </IconButton>
      </Tooltip>

      <lable
        style={{
          fontSize: "1.5rem",
          fontFamily: "Arial",
        }}
      >
        (Thêm giày vào đơn hàng)
      </lable>
      <div style={{ width: "85vw" }}>
        <TableDonHang
          columns={infoColumns}
          data={dataTable}
          setDataTable={setDataTable}
          readOnly={view}
        />
      </div>

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
            listGiayKH={listGiayKH}
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
        >
          <InDonHang
            infoHeader={formInfoDonHang}
            dataTable={dataTable}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default memo(FormDonHang);
