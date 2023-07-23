import { useState, useEffect } from "react";
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

const ChamCongSub = () => {
  const [dataTable, setDataTable] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sendData, setSendData] = useState({});
  const [showModal, setShowModal] = useState(false);
  //   const [rowSelection, setRowSelection] = useState({});

  console.log("GiaoHang");

  const handleDelete = () => {
    console.log("handleDelete");
    setShowModal(true);
  };

  useEffect(() => {
    fetch("http://localhost:8000/tv_chamcong")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataTable(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, [showModal]);

  return (
    <div className={styles.container}>
      <header className={styles.header_table}>Chấm công</header>
      <Tooltip arrow title="Delete">
        <IconButton
          onClick={() => {
            handleDelete();
          }}
        >
          <Delete style={{ color: "red" }} fontSize="large" />
        </IconButton>
      </Tooltip>
      <SubTable
        columns={infoColumns}
        data={dataTable}
        setShowForm={setShowForm}
        setSendData={setSendData}
        setData={setDataTable}
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
