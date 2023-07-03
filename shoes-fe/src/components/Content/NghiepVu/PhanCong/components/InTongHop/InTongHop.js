import { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import {
  getImageFromMAGIAY,
  getInfoBreakPage,
} from "~nghiep_vu/DonHang/components/InDonHang/helper";

import styles from "./InTongHop.module.scss";
import {
  INFO_COLS_THO,
  border_text_table_config,
  fontSize,
  dictInfoPrint,
  COL_INFO_SIZE,
} from "./ConstantVariable";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import { TableToPrint, SizeColumnInPrint } from "~common_tag/reports";
import { useTableContext, actions_table } from "~table_context";

const InTongHop = ({ sophieu, data }) => {
  console.log("data InTongHop: ", data);
  const [dataPrint, setDataPrint] = useState([]);
  const [stateTable, dispatchTable] = useTableContext();
  const [infoDetailsPrint, setInfoDetailsPrint] = useState([]);
  const [listImage, setListImage] = useState([]);
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
    for (let i = 0; i < data.length; i++) {
      let ma_giay = data[i]["MAGIAY"];
      if (!ma_giay_checked.includes(ma_giay)) {
        const info = {
          MAGIAY: ma_giay,
          TENGIAY: data[i]["TENGIAY"],
        };
        list_promises.push(getImageFromMAGIAY(ma_giay));
        info["TABLE"] = data.filter((_data) => _data["MAGIAY"] === ma_giay);
        console.log("info[tho]: ", info["TABLE"]);
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

          info["TABLE"][j]["TONGSO"] = tongso;
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
    Promise.all(list_promises).then((values) => {
      setListImage(values);
    });
    setDataPrint(info_print);
  }, []);

  useEffect(() => {
    if (dataPrint.length > 0 && listImage.length > 0) {
      let details = getInfoBreakPage(dataPrint, listImage, dictInfoPrint);
      setInfoDetailsPrint(details);
    }
  }, [dataPrint, listImage]);

  useLayoutEffect(() => {
    if (infoDetailsPrint.length > 0) {
      handelPrint();
    }
  }, [infoDetailsPrint]);

  return (
    <div ref={componentRef} className={styles.print_page} id="print_content">
      {infoDetailsPrint.length > 0 &&
        infoDetailsPrint.map((each_page, index_page) => (
          <div key={index_page} className={styles.each_page}>
            <h1 className={styles.print_header}>Số phiếu: {sophieu}</h1>
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

            {index_page < infoDetailsPrint.length - 1 && (
              <div
                className={styles.footer}
                style={{
                  marginTop: each_page["margin_bottom"],
                }}
              >
                {/* {index_page + 1}/{infoDetailsPrint.length} */}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default InTongHop;
