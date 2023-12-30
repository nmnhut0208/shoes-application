import { useRef, useState, useLayoutEffect } from "react";
import { useReactToPrint } from "react-to-print";

import styles from "./InDonHang.module.scss";
import {
  TableToPrint,
  SizeColumnInPrint,
  Signature,
} from "~common_tag/reports";
import { convertDateForReport } from "~utils/processing_date";
import { getDiaChiKhachHang, compute_total } from "./helper";
import { INFO_COLS_THO, COL_INFO_SIZE, fontSize } from "./ConstantVariable";
import { getImageOfDanhMuc } from "~utils/api_get_image";

const InDonHang = ({ infoHeader, dataTable, setShowModal }) => {
  const [header, setHeader] = useState(infoHeader);
  const [dataPrint, setDataPrint] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [doneGetDiaChi, setDoneGetDiaChi] = useState(false);

  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Đơn hàng",
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
        list_promises.push(getImageOfDanhMuc("giay", ma_giay, "MAGIAY"));
        info["GIABAN"] = dataTable[i]["GIABAN"];
        info["HEADER_TABLE"] = JSON.parse(JSON.stringify(INFO_COLS_THO));

        let tenca = dataTable[i]["TENCA"];

        for (var jj = 0; jj < info["HEADER_TABLE"].length; jj++) {
          console.log("key:-----", info["HEADER_TABLE"][jj].key);
          if (info["HEADER_TABLE"][jj].key === "TENMAUCA") {
            info["HEADER_TABLE"][jj].header = `CÁ: ${tenca}`;
            break;
          }
        }
        info["TABLE"] = dataTable.filter(
          (_data) => _data["MAGIAY"] === ma_giay
        );
        info["SL"] = compute_total(info["TABLE"]);
        for (let j = 0; j < info["TABLE"].length; j++) {
          info["TABLE"][j]["SIZE"] = "";
          let top = [];
          let bottom = [];
          let tongso = 0;
          for (let k = 0; k < COL_INFO_SIZE.length; k++) {
            if (info["TABLE"][j][COL_INFO_SIZE[k].name] > 0) {
              let value = parseInt(info["TABLE"][j][COL_INFO_SIZE[k].name]);
              top.push(COL_INFO_SIZE[k].key);
              bottom.push(value);
              tongso += value;
            } else {
              top.push("");
              bottom.push("");
            }
          }
          info["TABLE"][j]["SIZE"] = (
            <SizeColumnInPrint
              list_tuso={top}
              list_mauso={bottom}
              fontSize={fontSize}
            />
          );
        }
        ma_giay_checked.push(ma_giay);
        info_print.push(info);
      }
    }
    // Promise.all([getDiaChiKhachHang(infoHeader["MAKH"])]).then((values) => {
    //   setHeader({
    //     ...header,
    //     ...values[0],
    //     SL: compute_total(dataTable),
    //   });
    //   setDoneGetDiaChi(true);
    // });
    setHeader({
      ...header,
      SL: compute_total(dataTable),
    });
    setDoneGetDiaChi(true); // để hờ, ko cần thiết nữa vì ko cần lấy địa chỉ khách hàng
    Promise.all(list_promises).then((values) => {
      setListImage(values);
    });

    setDataPrint(info_print);
  }, []);

  useLayoutEffect(() => {
    if (dataPrint.length > 0 && listImage.length > 0 && doneGetDiaChi) {
      setShowModal(false);
      handelPrint();
    }
  }, [dataPrint, listImage, doneGetDiaChi]);

  console.log("dataPrint: ", dataPrint);

  return (
    <div ref={componentRef} className={styles.print_page} id="print_content">
      <div className={styles.each_page}>
        <div className={styles.print_header}>
          <h1>Số đơn hàng: {header["SODH"]}</h1>
          <h1 style={{ fontSize: "2rem !important" }}>{header["TENKH"]}</h1>
        </div>
        <div className={styles.print_header}>
          <h1>Ngày: {convertDateForReport(header["NGAYDH"])}</h1>
          <h1>
            {header["SL"]}
            {" | " + header["DIENGIAIPHIEU"]}
          </h1>
        </div>
        {dataPrint.length > 0 &&
          dataPrint.map((info, index) => (
            <div className={styles.print_object} key={index}>
              <div className={styles.info_giay}>
                <table style={{ width: "100%" }}>
                  <tr className={styles.info_row_giay}>
                    <td>
                      <div className={styles.show_content_column}>
                        <div>
                          <lable>{info["MAGIAY"]}</lable>
                          <lable> {info["GIABAN"]}</lable>
                        </div>

                        <lable style={{ fontWeight: "bold" }}>
                          SL: {info["SL"]}
                        </lable>
                      </div>
                    </td>
                    {listImage[index] && (
                      <td>{<img src={listImage[index]} />}</td>
                    )}
                    <td className={styles.TENGIAY}>{info["TENGIAY"]}</td>
                  </tr>
                </table>
              </div>
              <TableToPrint
                columns={info["HEADER_TABLE"]}
                data={info["TABLE"]}
                LIST_FORMAT_NUMBER={["GIABAN"]}
              />
            </div>
          ))}
        <br />
        <Signature fontSize={fontSize} />
      </div>
    </div>
  );
};

export default InDonHang;
