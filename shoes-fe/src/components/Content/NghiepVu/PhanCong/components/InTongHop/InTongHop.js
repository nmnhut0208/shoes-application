import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { getImageOfDanhMuc } from "~utils/api_get_image";

import styles from "./InTongHop.module.scss";
import { INFO_COLS_THO, fontSize, COL_INFO_SIZE } from "./ConstantVariable";
import { TableToPrint, SizeColumnInPrint } from "~common_tag/reports";
import { useTableContext, actions_table } from "~table_context";

const InTongHop = ({ sophieu, data, stylePrint = {} }) => {
  const [stateTable, dispatchTable] = useTableContext();
  const [dataPrint, setDataPrint] = useState([]);
  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Phân công",
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
        list_promises.push(getImageOfDanhMuc("giay", ma_giay, "MAGIAY"));
        info["TABLE"] = data.filter((_data) => _data["MAGIAY"] === ma_giay);

        info["HEADER_TABLE"] = JSON.parse(JSON.stringify(INFO_COLS_THO));

        let tenca = data[i]["TENCA"];

        for (var jj = 0; jj < info["HEADER_TABLE"].length; jj++) {
          if (info["HEADER_TABLE"][jj].key === "TENMAUCA") {
            info["HEADER_TABLE"][jj].header = `CÁ: ${tenca}`;
            break;
          }
        }

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
    // Promise.all(list_promises).then((values) => {
    //   setListImage(values);
    // });
    setDataPrint(info_print);
  }, []);

  useLayoutEffect(() => {
    if (dataPrint.length > 0) {
      // && listImage.length > 0) {
      if (Object.keys(stylePrint).length == 0) {
        dispatchTable(actions_table.setModeShowModal(false));
        handelPrint();
      }
    }
  }, [dataPrint]);

  return (
    <div
      ref={componentRef}
      className={styles.print_page}
      style={{ ...stylePrint }}
      id="print_content"
    >
      <div className={styles.each_page}>
        <h1 className={styles.print_header}>Số phiếu: {sophieu}</h1>
        {dataPrint.length > 0 &&
          dataPrint.map((info, index) => (
            <div className={styles.print_object} key={index}>
              <div className={styles.info_giay}>
                <table style={{ width: "100%" }}>
                  <tr className={styles.info_row_giay}>
                    <td>
                      <div className={styles.show_content_column}>
                        <lable>{info["MAGIAY"]}</lable>
                      </div>
                    </td>
                    {/* {listImage[index] && (
                      <td>{<img src={listImage[index]} />}</td>
                    )} */}
                    <td className={styles.TENGIAY}>{info["TENGIAY"]}</td>
                  </tr>
                </table>
              </div>
              <TableToPrint
                columns={info["HEADER_TABLE"]}
                data={info["TABLE"]}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default InTongHop;
