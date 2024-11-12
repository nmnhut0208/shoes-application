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

const updateData = (queryMANV, queryMAKY, queryStartDate, queryEndDate, setDataTable) => {
  let url = "http://localhost:8000/tv_chamcong?";

  let params = new URLSearchParams(url.search);

  if (queryMANV != "") {
    params.append("MANV", queryMANV)
  }

  if (queryMAKY != "") {
    params.append("MAKY", queryMAKY)
  }

  if (queryStartDate != "") {
    params.append("StartDate", queryStartDate)
  }
  if (queryEndDate != "") {
    params.append("EndDate", queryEndDate)
  }
  console.log("params: ", params.toString())

  fetch(url + params.toString())
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

  const [queryMANV, setQueryMANV] = useState("");
  const [queryMAKY, setQueryMAKY] = useState("");
  const [queryStartDate, setQueryStartDate] = useState("");
  const [queryEndDate, setQueryEndDate] = useState("");

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
    updateData(queryMANV, queryMAKY, queryStartDate, queryEndDate, setDataTable);
  }, [showModal]);

  const handleTruyVan = () => {
    updateData(queryMANV, queryMAKY, queryStartDate, queryEndDate, setDataTable);
    let current_year = moment().year();
    if (queryStartDate !== "") {
      let date = new Date(queryStartDate);
      let year = date.getFullYear();
      if (parseInt(year) == current_year) {
        setAllowDelete(true);
      }
      else {
        setAllowDelete(false);
      }
    }
    else if (queryEndDate !== "") {
      let date = new Date(queryEndDate);
      let year = date.getFullYear();
      if (parseInt(year) == current_year) {
        setAllowDelete(true);
      }
      else {
        setAllowDelete(false);
      }
    }
    else setAllowDelete(true);
  };

  const handleClearFilter = () => {
    setQueryMAKY("");
    setQueryMANV("");
    setQueryStartDate("");
    setQueryEndDate("");
    updateData("", "", "", "", setDataTable);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header_table}>Truy vấn - Chấm công</h1>
      <div className={clsx(styles.form, styles.info_query)}>
        <label>Mã kỳ</label>
        <input
          type="text"
          value={queryMAKY}
          onChange={(e) => setQueryMAKY(e.target.value)}
        />
        <label>Mã nhân viên</label>
        <input
          type="text"
          value={queryMANV}
          onChange={(e) => setQueryMANV(e.target.value)}
        />
        <label>Ngày bắt đầu</label>
        <input
          type="date"
          value={queryStartDate}
          onChange={(e) => setQueryStartDate(e.target.value)}
        />
        <label>Ngày kết thúc</label>
        <input
          type="date"
          value={queryEndDate}
          onChange={(e) => setQueryEndDate(e.target.value)}
        />
        <button onClick={handleTruyVan}>Truy Vấn</button>
        <button onClick={handleClearFilter}>Xoá bộ lọc</button>
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
