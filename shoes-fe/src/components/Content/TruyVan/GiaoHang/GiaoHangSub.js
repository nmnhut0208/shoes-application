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
const updateData = (year, setDataTable) => {
  let url = "http://localhost:8000/tv_giaohang";
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

const GiaoHangSub = ({ setIsSaveDataTruyVanGiaoHang, permission }) => {
  const [dataTable, setDataTable] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sendData, setSendData] = useState({});
  const [year, setYear] = useState("");
  //   const [rowSelection, setRowSelection] = useState({});

  console.log("GiaoHang");

  useEffect(() => {
    if (year === "") updateData(year, setDataTable);
  }, [year]);

  const handleTruyVan = () => {
    updateData(year, setDataTable);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header_table}>Phiếu Giao hàng - F0033</header>
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
      <SubTable
        columns={infoColumns}
        data={dataTable}
        setShowForm={setShowForm}
        setSendData={setSendData}
        setDataTable={setDataTable}
        // rowSelection={rowSelection}
        // setRowSelection={setRowSelection}
        maxHeight={"65rem"}
      />
      {showForm && (
        <ModalForm setShowForm={setShowForm}>
          <FormGiaoHang infoKH={sendData} setShowForm={setShowForm} />
        </ModalForm>
      )}
    </div>
  );
};

export default GiaoHangSub;
