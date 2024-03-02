import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import moment from "moment";
import { Modal } from "~common_tag";
import SubTable from "./SubTable";
import styles from "./ChamCongSub.module.scss";
import FormChamCong from "./FormChamCong/FormChamCong";
import ModalDelelete from "./ModalDelete";
import FormDelete from "./FormDelete";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import { convertDateForReport } from "~utils/processing_date";
import { useUserContext } from "~user";
import { CustomAlert } from "~utils/alert_custom";

const list_key = [
  { header: "Mã kỳ", key: "MAKY" },
  { header: "Mã phiếu", key: "MAPHIEU" },
  {
    header: "Ngày phiếu",
    key: "NGAYPHIEU",
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  { header: "Diễn giải", key: "DIENGIAI" },
  { header: "Mã Nhân Viên", key: "MANVIEN" },
  {
    header: "Số lượng",
    key: "SOLUONG",
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
];

const infoColumns = processingInfoColumnTable(list_key);

const updateData = (year, setDataTable) => {
  let url = "http://localhost:8000/tv_chamcong";
  if (year != "" && year > 2020) {
    url += "?YEAR=" + year;
  }
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      setDataTable(info);
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

const ChamCongSub = () => {
  const [dataTable, setDataTable] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sendData, setSendData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [stateUser, dispatchUser] = useUserContext();

  const [year, setYear] = useState("");
  const [allowDelete, setAllowDelete] = useState(true);

  const handleDelete = () => {
    if (
      stateUser.userPoolAccess.some(
        (obj) => obj.MAFORM === "F0042" && obj.XOA === 1
      )
    ) {
      setShowModal(true);
    } else {
      CustomAlert("Bạn không có quyền xóa");
    }
  };

  useEffect(() => {
    updateData(year, setDataTable);
  }, [showModal]);

  const handleTruyVan = () => {
    updateData(year, setDataTable);
    let current_year = moment().year();
    if (year === "" || parseInt(year) == current_year) setAllowDelete(true);
    else setAllowDelete(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header_table}>Truy vấn - Chấm công</h1>
      <div className={clsx(styles.form, styles.info_query)}>
        <label>Xem dữ liệu năm</label>
        <input
          type="number"
          min="2020"
          step="1"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
        />
        <button onClick={handleTruyVan}>Truy Vấn</button>
      </div>

      <br />
      {allowDelete && (
        <button
          className={styles.delete_button}
          onClick={() => {
            handleDelete();
          }}
        >
          Xoá thông tin chấm công theo Kỳ
        </button>
      )}
      <SubTable
        columns={infoColumns}
        data={dataTable}
        setShowForm={setShowForm}
        setSendData={setSendData}
        setData={setDataTable}
        allowDelete={allowDelete}
        // rowSelection={rowSelection}
        // setRowSelection={setRowSelection}
        maxHeight={"65rem"}
      />
      {showForm && (
        <Modal>
          <FormChamCong
            infoForm={sendData}
            setData={setDataTable}
            setShowForm={setShowForm}
          />
        </Modal>
      )}
      {showModal && (
        <ModalDelelete setShowForm={setShowModal}>
          <FormDelete setShowModal={setShowModal} />
        </ModalDelelete>
      )}
    </div>
  );
};

export default ChamCongSub;
