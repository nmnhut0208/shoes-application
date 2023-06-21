import { useMemo, useRef, useState, useLayoutEffect } from "react";
import { useReactToPrint } from "react-to-print";

import styles from "./InDonHang.module.scss";
import { INFO_COLS_THO } from "./ConstantVariable";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import { TableToPrint, SizeColumnInPrint } from "~common_tag";
import { convertDateForReport } from "~utils/processing_date";

const COL_INFO_SIZE = [
  { key: 0, name: "SIZE0" },
  { key: 5, name: "SIZE5" },
  { key: 6, name: "SIZE6" },
  { key: 7, name: "SIZE7" },
  { key: 8, name: "SIZE8" },
  { key: 9, name: "SIZE9" },
];

const getImageFromMAGIAY = async (MAGIAY) => {
  const response = await fetch(
    "http://localhost:8000/giay/get_HINHANH?MAGIAY=" + MAGIAY
  );
  const result = await response.json();
  console.log(MAGIAY, result);
  return result[0]["HINHANH"];
};

const getDiaChiKhachHang = async (MAKH) => {
  const response = await fetch(
    "http://localhost:8000/khachhang/get_details?MAKH=" + MAKH
  );
  const result = await response.json();
  return result[0];
};

const InDonHang = ({ infoHeader, dataTable, setShowModal }) => {
  const [header, setHeader] = useState(infoHeader);
  const [dataPrint, setDataPrint] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [doneGetDiaChi, setDoneGetDiaChi] = useState(false);
  const columns = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_THO);
  }, []);
  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Thông tin đơn hàng",
  });
  useLayoutEffect(() => {
    let ma_giay_checked = [];
    let info_print = [];
    let list_promises = [];
    for (let i = 0; i < dataTable.length; i++) {
      let ma_giay = dataTable[i]["MAGIAY"];
      if (!ma_giay_checked.includes(ma_giay)) {
        const info = {
          MAGIAY: ma_giay,
          TENGIAY: dataTable[i]["TENGIAY"],
        };
        list_promises.push(getImageFromMAGIAY(ma_giay));
        info["THO"] = dataTable.filter((_data) => _data["MAGIAY"] === ma_giay);
        for (let j = 0; j < info["THO"].length; j++) {
          info["THO"][j]["SIZE"] = "";
          let top = [];
          let line = [];
          let bottom = [];
          let tongso = 0;
          for (let k = 0; k < COL_INFO_SIZE.length; k++) {
            if (info["THO"][j][COL_INFO_SIZE[k].name] > 0) {
              let value = parseInt(info["THO"][j][COL_INFO_SIZE[k].name]);
              top.push(COL_INFO_SIZE[k].key);
              line.push("__");
              bottom.push(value);
              tongso += value;
            }
          }

          info["THO"][j]["TONGSO"] = tongso;
          info["THO"][j]["SIZE"] = (
            <SizeColumnInPrint list_tuso={top} list_mauso={bottom} />
          );
        }
        ma_giay_checked.push(ma_giay);
        info_print.push(info);
      }
    }
    Promise.all([getDiaChiKhachHang(infoHeader["MAKH"])]).then((values) => {
      setHeader({ ...header, ...values[0] });
      setDoneGetDiaChi(true);
    });
    Promise.all(list_promises).then((values) => {
      setListImage(values);
    });

    setDataPrint(info_print);
  }, []);
  // console.log("==============================");
  // console.log("header: ", header);
  // console.log("dataPrint: ", dataPrint);
  // console.log("listImage: ", listImage);
  // console.log("doneGetDiaChi: ", doneGetDiaChi);

  useLayoutEffect(() => {
    if (dataPrint.length > 0 && listImage.length > 0 && doneGetDiaChi) {
      handelPrint();
      setShowModal(false);
    }
  }, [dataPrint, listImage, doneGetDiaChi]);

  return (
    <div ref={componentRef} className={styles.print_page}>
      <div className={styles.print_header}>
        <h1>Số đơn hàng: {header["SODH"]}</h1>
        <h1>{header["TENKH"]}</h1>
      </div>
      <div className={styles.print_header}>
        <h2>Ngày: {convertDateForReport(header["NGAYDH"])}</h2>
        <h2>{header["DIACHI"]}</h2>
      </div>
      <br />
      <br />

      {dataPrint.length > 0 &&
        dataPrint.map((info, index) => (
          <div className={styles.print_object} key={index}>
            <div className={styles.info_giay}>
              <table style={{ width: "100%" }}>
                <tr className={styles.info_row_giay}>
                  <td className={styles.TENGIAY}>{info["TENGIAY"]}</td>
                  <td>{listImage[index] && <img src={listImage[index]} />}</td>
                  <td>{info["MAGIAY"]}</td>
                </tr>
              </table>
            </div>
            <TableToPrint data={info["THO"]} columns={columns} />
          </div>
        ))}
    </div>
  );
};

export default InDonHang;
