import { useEffect, useState, useMemo, memo } from "react";

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
  saveDonDatHang,
  updateFormDonHang,
  updateColumnsInformations,
  numberSizeToTab,
} from "./helper";
import { CustomAlert } from "~utils/alert_custom";

import { INFO_COLS_DONHANG } from "./ConstantVariable";

const FormDonHang = ({
  dataView,
  isSaveData,
  setIsSaveData,
  permission,
  action = "add",
}) => {
  const view = useMemo(() => {
    if (
      action !== "add" &&
      permission &&
      permission.XEM === 1 &&
      permission.SUA === 0
    )
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
  const [lastestDH, setLastestDH] = useState(0);

  const [infoFormWillShow, setInfoFormWillShow] = useState({
    giay: false,
    mau: false,
    dmGiaykh: false,
    inDonHang: false,
    viewInDonHang: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [listGiayUnique, setListGiayUnique] = useState([]);
  const [listGiayKH, setListGiayKH] = useState([]);
  const [clickNhapTiep, setClickNhapTiep] = useState(false);

  const [focusedRowToTab, setFocusedRowToTab] = useState(-1);
  const [focusedColumnToTab, setFocusedColumnToTab] = useState(-1);
  const [canDownUpArrow, setCanDownUpArrow] = useState(true);
  const [changeFocus, setChangeFocus] = useState(false);

  useEffect(() => {
    if (formInfoDonHang["MAKH"] !== "") {
      fetch(
        "http://localhost:8000/donhang/giay_unique/" + formInfoDonHang["MAKH"]
      )
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          setListGiayUnique(info);
        })
        .catch((err) => {
          console.log(":error: ", err);
        });

      fetch(
        "http://localhost:8000/donhang/khachhang/" +
        encodeURIComponent(formInfoDonHang["MAKH"]) +
        "/giay"
      )
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          setListGiayKH(info);
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    }
  }, [formInfoDonHang["MAKH"], clickNhapTiep]);

  const [firstRender, setFirstRender] = useState(false);

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
      setFirstRender(true);
    } else {
      updateFormDonHang(formInfoDonHang, setFormInfoDonHang, setLastestDH);
      setDataTable(renderDataEmpty(INFO_COLS_DONHANG, 1));
      setFirstRender(false);
    }
    setIsSaveData(true);
  }, [dataView]);

  const resetFocusStatus = () => {
    setFocusedRowToTab(-1);
    setFocusedColumnToTab(-1);
  };

  const handleThemGiay = () => {
    resetFocusStatus();
    setInfoFormWillShow({
      giay: true,
      mau: false,
      dmGiaykh: false,
      inDonHang: false,
      viewInDonHang: false,
    });
    setShowModal(true);
  };

  const handleThemMau = () => {
    resetFocusStatus();
    setInfoFormWillShow({
      giay: false,
      mau: true,
      dmGiaykh: false,
      inDonHang: false,
      viewInDonHang: false,
    });
    setShowModal(true);
  };

  const handleNhapTiep = () => {
    resetFocusStatus();
    setClickNhapTiep(!clickNhapTiep);
    if (dataTable.length == 0) {
      setDataTable(renderDataEmpty(INFO_COLS_DONHANG, 1));
      return;
    }
    if (!isSaveData) {
      CustomAlert("Lưu thông tin trước khi nhập tiếp đơn khác!");
      return;
    }
    updateFormDonHang(formInfoDonHang, setFormInfoDonHang, setLastestDH);
    setDataTable(renderDataEmpty(INFO_COLS_DONHANG, 1));
    setIsSaveData(true);
  };

  const handleSaveDonHang = () => {
    resetFocusStatus();
    if (isSaveData) return;

    let dataDatHang = dataTable.filter(
      (data) => data["SOLUONG"] > 0 && data["MAGIAY"] !== ""
    );
    if (dataDatHang.length == 0) {
      CustomAlert(
        "Bạn chưa đặt hàng hoặc chưa chọn số lượng mỗi loại giày cần đặt!"
      );
      return;
    } else {
      saveDonDatHang(formInfoDonHang, dataDatHang);
      if (!dataView) {
        updateSODH(lastestDH);
      }
      setIsSaveData(true);
      setClickNhapTiep(!clickNhapTiep); // to reload list giày của khách hàng
    }
  };

  const handleClickMaGiay = () => {
    resetFocusStatus();
    if (formInfoDonHang["MAKH"] === "") {
      CustomAlert("Vui lòng chọn khách hàng!");
      return;
    }

    setInfoFormWillShow({
      giay: false,
      mau: false,
      dmGiaykh: true,
      inDonHang: false,
      viewInDonHang: false,
    });
    setShowModal(true);
  };

  const infoColumns = useMemo(() => {
    return updateColumnsInformations(
      dataTable,
      setDataTable,
      view,
      listGiayUnique,
      setFocusedRowToTab,
      setFocusedColumnToTab,
      setCanDownUpArrow
    );
  }, [dataTable, listGiayUnique]);

  useEffect(() => {
    if (dataTable.length > 0) {
      let _data = dataTable.filter((row) => row.SOLUONG > 0);
      if (_data.length > 0 && !firstRender) {
        setIsSaveData(false);
      }
      if (_data.length > 0 && firstRender) {
        setFirstRender(false);
      }
    }
  }, [formInfoDonHang, dataTable]);

  const handleInDonHang = () => {
    resetFocusStatus();
    if (dataTable.length == 0) return;
    setInfoFormWillShow({
      giay: false,
      mau: false,
      dmGiaykh: false,
      inDonHang: true,
      viewInDonHang: false,
    });
    setShowModal(true);
  };

  const handleViewInDonHang = () => {
    resetFocusStatus();
    if (dataTable.length == 0) return;
    setInfoFormWillShow({
      giay: false,
      mau: false,
      dmGiaykh: false,
      inDonHang: false,
      viewInDonHang: true,
    });
    setShowModal(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (focusedColumnToTab < 0 && focusedRowToTab < 0) {
        return;
      }

      var numberLine = dataTable.reduce(function (count, record) {
        return count + (record.MAGIAY !== "" ? 1 : 0);
      }, 0);

      let xNewToTab = parseInt(focusedRowToTab);
      let yNewToTab = parseInt(focusedColumnToTab);
      let notAction = false;
      switch (e.key) {
        case "ArrowLeft":
          // Xử lý sự kiện mũi tên qua trái
          yNewToTab = yNewToTab - 1;
          if (yNewToTab < 0) {
            yNewToTab = numberSizeToTab - 1;
            xNewToTab = xNewToTab - 1;
          }
          if (xNewToTab < 0) {
            xNewToTab = 0;
            yNewToTab = 0;
          }
          break;

        case "ArrowRight":
          yNewToTab = yNewToTab + 1;
          if (yNewToTab >= numberSizeToTab) {
            xNewToTab = xNewToTab + 1;
            yNewToTab = 0;
          }
          if (xNewToTab >= numberLine) {
            xNewToTab = 0;
            yNewToTab = 0;
          }
          break;
        case "ArrowUp":
          if (!canDownUpArrow) {
            notAction = true;
            return;
          }
          xNewToTab = xNewToTab - 1;
          if (xNewToTab < 0) {
            xNewToTab = numberLine - 1;
            yNewToTab = yNewToTab - 1;
          }
          if (yNewToTab < 0) {
            yNewToTab = 0;
            xNewToTab = 0;
          }
          break;
        case "ArrowDown":
          if (!canDownUpArrow) {
            notAction = true;
            return;
          }
          xNewToTab = xNewToTab + 1;
          if (xNewToTab >= numberLine) {
            xNewToTab = 0;
            yNewToTab = yNewToTab + 1;
          }
          if (yNewToTab >= numberSizeToTab) {
            yNewToTab = 0;
          }
          break;
        case "Tab":
          if (e.shiftKey) {
            // shift tab
            yNewToTab = yNewToTab - 1;
            if (yNewToTab < 0) {
              yNewToTab = numberSizeToTab - 1;
              xNewToTab = xNewToTab - 1;
            }
            if (xNewToTab < 0) {
              xNewToTab = 0;
              yNewToTab = 0;
            }
          } else {
            yNewToTab = yNewToTab + 1;
            if (yNewToTab >= numberSizeToTab) {
              xNewToTab = xNewToTab + 1;
              yNewToTab = 0;
            }
            if (xNewToTab >= numberLine) {
              xNewToTab = 0;
              yNewToTab = 0;
            }
          }
          break;
        default:
          return;
      }

      if (notAction) {
        return;
      }
      setFocusedRowToTab(xNewToTab);
      setFocusedColumnToTab(yNewToTab);
      setCanDownUpArrow(true);

      var inputElement = document.getElementById(
        `Id_${xNewToTab}_${yNewToTab}`
      );
      // Kiểm tra xem phần tử tồn tại trước khi đặt focus
      if (inputElement) {
        if (yNewToTab < 6) {
          setTimeout(function () {
            inputElement.click();
          }, 0); // để 0 cũng được, để nó vô hàng chờ thôi => brower event
        } else if (yNewToTab >= 6 && yNewToTab <= 13) {
          inputElement.focus();
          setTimeout(function () {
            inputElement.select();
          }, 0);
        } else {
          setTimeout(function () {
            inputElement.select();
          }, 0);
        }
      } else {
        //
      }

      setChangeFocus(!changeFocus);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Loại bỏ lắng nghe sự kiện bàn phím khi component unmount
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    changeFocus,
    dataTable,
    focusedColumnToTab,
    focusedRowToTab,
    canDownUpArrow,
  ]);

  return (
    <div className={styles.page} style={{ width: "100%" }}>
      <FormInfoDonHang
        formInfoDonHang={formInfoDonHang}
        setFormInfoDonHang={setFormInfoDonHang}
        view={view}
        action={action}
        resetFocusStatus={resetFocusStatus}
      />

      <button className={styles.update_button} onClick={handleClickMaGiay}>
        Thêm giày đã đặt vào đơn hàng
      </button>

      <div>
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
            disabled={
              permission.IN === 0 || dataTable.length == 0 || !isSaveData
            }
          >
            In
          </button>

          <button
            onClick={handleViewInDonHang}
            disabled={
              permission.IN === 0 || dataTable.length == 0 || !isSaveData
            }
          >
            Xem thông tin đơn hàng
          </button>

          {action === "add" && (
            <button
              onClick={handleNhapTiep}
              disabled={permission.THEM === 0 || !isSaveData}
            >
              Nhập tiếp
            </button>
          )}
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
          <FormGiay
            setShowModal={setShowModal}
            listGiayUnique={listGiayUnique}
            setListGiayUnique={setListGiayUnique}
            MAKH={formInfoDonHang["MAKH"]}
          />
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
            // dataTable={dataTable.slice(0, dataTable.length - 1)}
            dataTable={dataTable.filter(
              (data) => data["SOLUONG"] > 0 && data["MAGIAY"] !== ""
            )}
            // remove dòng cuối cùng
            setShowModal={setShowModal}
            stylePrint={{}}
          />
        </Modal>
      )}

      {infoFormWillShow["viewInDonHang"] && (
        <Modal
          title="In Đơn Hàng"
          status={showModal}
          setShowModal={setShowModal}
        >
          <InDonHang
            infoHeader={formInfoDonHang}
            // dataTable={dataTable.slice(0, dataTable.length - 1)}
            dataTable={dataTable.filter(
              (data) => data["SOLUONG"] > 0 && data["MAGIAY"] !== ""
            )}
            // remove dòng cuối cùng
            setShowModal={setShowModal}
            stylePrint={{
              "scroll-behavior": "smooth",
              "overflow-y": "overlay",
              "overflow-x": "hidden",
              height: "600px",
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default memo(FormDonHang);
