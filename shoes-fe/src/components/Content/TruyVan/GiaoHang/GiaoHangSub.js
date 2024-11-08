import { useState, useEffect } from "react";
import clsx from "clsx";
import FormGiaoHang from "./FormGiaoHang";
import ModalForm from "./ModalForm";
import SubTable from "./SubTable";
import styles from "./GiaoHangSub.module.scss";
import { convertDateForReport } from "~utils/processing_date";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Số phiếu", key: "SOPHIEU" },
  {
    header: "Ngày phiếu",
    key: "NGAYPHIEU",
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  { header: "Khách hàng", key: "MAKH" },
  { header: "Tên khách hàng", key: "TENKH" },
  { header: "Diễn giải", key: "DIENGIAIPHIEU" },
];

const infoColumns = processingInfoColumnTable(list_key);
const updateData = (querySOPHIEU, queryMAKH, queryTENKH, queryStartDate, queryEndDate, setDataTable) => {
  let url = "http://localhost:8000/tv_giaohang?";
  let params = new URLSearchParams(url.search);

  if (querySOPHIEU != "") {
    params.append("SOPHIEU", querySOPHIEU)
  }

  if (queryMAKH != "") {
    params.append("MAKH", queryMAKH)
  }

  if (queryTENKH != "") {
    params.append("TENKH", queryTENKH)
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
      setDataTable([]);
      console.log(":error: ", err);
    });
};

const GiaoHangSub = ({
  isSaveData,
  setIsSaveDataTruyVanGiaoHang,
  permission,
}) => {
  const [dataTable, setDataTable] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sendData, setSendData] = useState({});
  const [querySOPHIEU, setQuerySOPHIEU] = useState("");
  const [queryMAKH, setQueryMAKH] = useState("");
  const [queryTENKH, setQueryTENKH] = useState("");
  const [queryStartDate, setQueryStartDate] = useState("");
  const [queryEndDate, setQueryEndDate] = useState("");

  useEffect(() => {
    updateData(querySOPHIEU, queryMAKH, queryTENKH, queryStartDate, queryEndDate, setDataTable);
  }, []);

  const handleTruyVan = () => {
    updateData(querySOPHIEU, queryMAKH, queryTENKH, queryStartDate, queryEndDate, setDataTable);
  };

  const handleClearFilter = () =>{
    setQuerySOPHIEU("");
    setQueryMAKH("");
    setQueryTENKH("");
    setQueryStartDate("");
    setQueryEndDate("");
    updateData("", "", "", "", "", setDataTable);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header_table}>Truy vấn - Giao hàng</h1>
      <div className={clsx(styles.form, styles.info_query)}>
      <label>Số phiếu</label>
        <input
          type="text"
          value={querySOPHIEU}
          onChange={(e) => setQuerySOPHIEU(e.target.value)}
        />
        <label>Mã khách hàng</label>
        <input
          type="text"
          value={queryMAKH}
          onChange={(e) => setQueryMAKH(e.target.value)}
        />
        <label>Tên khách hàng</label>
        <input
          type="text"
          value={queryTENKH}
          onChange={(e) => setQueryTENKH(e.target.value)}
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
      <SubTable
        columns={infoColumns}
        data={dataTable}
        setShowForm={setShowForm}
        setSendData={setSendData}
        setDataTable={setDataTable}
        maxHeight={"65rem"}
      />
      {showForm && (
        <ModalForm
          setShowForm={setShowForm}
          isSaveData={isSaveData}
          setSaveData={setIsSaveDataTruyVanGiaoHang}
        >
          <FormGiaoHang
            permission={permission}
            infoKH={sendData}
            setInfoKH={setSendData}
            // year={year}
            setDataTableBig={setDataTable}
            setShowForm={setShowForm}
            setIsSaveDataTruyVanGiaoHang={setIsSaveDataTruyVanGiaoHang}
            isSaveData={isSaveData}
          />
        </ModalForm>
      )}
    </div>
  );
};

export default GiaoHangSub;
