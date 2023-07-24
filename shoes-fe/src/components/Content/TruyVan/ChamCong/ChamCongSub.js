import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import moment from "moment";
import { Modal } from "~common_tag";
import SubTable from "./SubTable";
import styles from "./ChamCongSub.module.scss";
import FormChamCong from "./FormChamCong/FormChamCong";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ModalDelelete from "./ModalDelete";
import FormDelete from "./FormDelete";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import { convertDateForReport } from "~utils/processing_date";

const list_key = [
  { header: "Mã kỳ", key: "MAKY" },
  { header: "Mã Nhân Viên", key: "MANVIEN" },
  { header: "Số phiếu", key: "SOPHIEU" },
  {
    header: "Ngày phiếu",
    key: "NGAYPHIEU",
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
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
  { header: "Diễn giải", key: "DIENGIAI" },
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

  const [year, setYear] = useState("");
  const allow_delete = useMemo(() => {
    let current_year = moment().year();
    console.log("current_year: ", current_year, typeof current_year);
    if (year === "" || parseInt(year) == current_year) return true;
    else return false;
  }, [year]);
  //   const [rowSelection, setRowSelection] = useState({});

  console.log("GiaoHang");

  const handleDelete = () => {
    console.log("handleDelete");
    setShowModal(true);
  };

  useEffect(() => {
    updateData(year, setDataTable);
  }, [showModal]);

  const handleTruyVan = () => {
    updateData(year, setDataTable);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header_table}>Chấm công</header>
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
      {allow_delete && (
        <Tooltip arrow title="Delete">
          <IconButton
            onClick={() => {
              handleDelete();
            }}
          >
            <Delete style={{ color: "red" }} fontSize="large" />
          </IconButton>
        </Tooltip>
      )}
      <SubTable
        columns={infoColumns}
        data={dataTable}
        setShowForm={setShowForm}
        setSendData={setSendData}
        setData={setDataTable}
        allow_delete={allow_delete}
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
