import { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

import styles from "./InDonHang.module.scss";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import {
  TableToPrint,
  SizeColumnInPrint,
  Signature,
} from "~common_tag/reports";
import { convertDateForReport } from "~utils/processing_date";
import { getDiaChiKhachHang, compute_total, getInfoBreakPage } from "./helper";
import {
  INFO_COLS_THO,
  COL_INFO_SIZE,
  dictInfoPrint,
  border_text_table_config,
  fontSize,
} from "./ConstantVariable";
import { getImageOfDanhMuc } from "~utils/api_get_image";

const InDonHang = ({ infoHeader, dataTable, setShowModal }) => {
  const [header, setHeader] = useState(infoHeader);
  const [dataPrint, setDataPrint] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [infoDetailsPrint, setInfoDetailsPrint] = useState([]);
  const [doneGetDiaChi, setDoneGetDiaChi] = useState(false);
  const columns = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_THO);
  }, []);
  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Thông tin phân công",
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
        info["TABLE"] = dataTable.filter(
          (_data) => _data["MAGIAY"] === ma_giay
        );
        for (let j = 0; j < info["TABLE"].length; j++) {
          info["TABLE"][j]["SIZE"] = "";
          let top = [];
          let line = [];
          let bottom = [];
          let tongso = 0;
          for (let k = 0; k < COL_INFO_SIZE.length; k++) {
            if (info["TABLE"][j][COL_INFO_SIZE[k].name] > 0) {
              let value = parseInt(info["TABLE"][j][COL_INFO_SIZE[k].name]);
              top.push(COL_INFO_SIZE[k].key);
              line.push("__");
              bottom.push(value);
              tongso += value;
            }
          }

          info["TABLE"][j]["TONGSO"] = parseInt(info["TABLE"][j]["SOLUONG"]); //tongso;
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
    Promise.all([getDiaChiKhachHang(infoHeader["MAKH"])]).then((values) => {
      setHeader({
        ...header,
        ...values[0],
        SL: compute_total(dataTable),
      });
      setDoneGetDiaChi(true);
    });
    Promise.all(list_promises).then((values) => {
      setListImage(values);
    });

    setDataPrint(info_print);
  }, []);

  useEffect(() => {
    if (dataPrint.length > 0 && listImage.length > 0 && doneGetDiaChi) {
      let details = getInfoBreakPage(dataPrint, listImage, dictInfoPrint);
      setInfoDetailsPrint(details);
    }
  }, [dataPrint, listImage, doneGetDiaChi]);

  console.log("infoDetailsPrint: ", infoDetailsPrint);

  useLayoutEffect(() => {
    if (infoDetailsPrint.length > 0) {
      // setShowModal(false);
      handelPrint();
    }
  }, [infoDetailsPrint]);

  return (
    <div ref={componentRef} className={styles.print_page} id="print_content">
      {infoDetailsPrint.length > 0 &&
        infoDetailsPrint.map((each_page, index_page) => (
          <div key={index_page} className={styles.each_page}>
            <div className={styles.print_header}>
              <h1>Số đơn hàng: {header["SODH"]}</h1>
              <h1 style={{ fontSize: "2rem !important" }}>{header["TENKH"]}</h1>
            </div>

            <div className={styles.print_header}>
              <h1>Ngày: {convertDateForReport(header["NGAYDH"])}</h1>
              <h1>
                {header["SL"]}
                {" | " + header["DIACHI"]}
              </h1>
            </div>

            {each_page &&
              each_page["content"].length > 0 &&
              each_page["content"].map((info, index) => (
                <div className={styles.print_object} key={index}>
                  <div className={styles.info_giay}>
                    <table style={{ width: "100%" }}>
                      <tr className={styles.info_row_giay}>
                        <td>
                          <div className={styles.show_content_column}>
                            <lable>{info["MAGIAY"]}</lable>
                            <lable style={{ fontWeight: "bold" }}>
                              SL: {info["SL"]}
                            </lable>
                          </div>
                        </td>
                        {info["HINHANH"] && (
                          <td>{<img src={info["HINHANH"]} />}</td>
                        )}
                        <td className={styles.TENGIAY}>{info["TENGIAY"]}</td>
                      </tr>
                    </table>
                  </div>
                  <TableToPrint
                    data={info["Table"]}
                    columns={columns}
                    border_text_table_config={border_text_table_config}
                  />
                </div>
              ))}

            {(index_page < infoDetailsPrint.length - 1 ||
              each_page["margin_bottom"] < dictInfoPrint["footer"]) && (
              <div
                className={styles.footer}
                style={{
                  marginTop: each_page["margin_bottom"] - 40,
                }}
              >
                {index_page + 1}/{infoDetailsPrint.length}
              </div>
            )}

            {index_page === infoDetailsPrint.length - 1 && (
              <>
                {each_page["margin_bottom"] > dictInfoPrint["footer"] && (
                  <div>
                    <br />
                    <br />
                  </div>
                )}
                <Signature fontSize={fontSize} />
                <div
                  className={styles.footer}
                  style={{
                    marginTop: each_page["margin_bottom"] - 130,
                  }}
                >
                  {index_page + 1}/{infoDetailsPrint.length}
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default InDonHang;
