import { useRef, useState, useLayoutEffect } from "react";
import { useReactToPrint } from "react-to-print";
import styles from "./In.module.scss";
import { INFO_COLS_THO, fontSize, COL_INFO_SIZE } from "./ConstantVariable";
import { TableToPrint, SizeColumnInPrint } from "~common_tag/reports";
import { getDonGiaQuai, getDonGiaDe } from "~utils/api_get_info_giay";
import { useTableContext, actions_table } from "~table_context";

const processing_data = (data, TYPE) => {
  let ma_giay_checked = [];
  let info_print = [];
  for (let i = 0; i < data.length; i++) {
    let ma_giay = data[i]["MAGIAY"];

    let DONGIA = undefined;
    if (TYPE === "THOQUAI") {
      DONGIA = getDonGiaQuai(ma_giay);
    } else {
      DONGIA = getDonGiaDe(ma_giay);
    }
    if (!ma_giay_checked.includes(ma_giay)) {
      const info = {
        MAGIAY: ma_giay,
        TENGIAY: data[i]["TENGIAY"],
      };
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
        info["TABLE"][j]["DONGIA"] = DONGIA;
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
        info["TABLE"][j]["THANHTIEN"] = tongso * DONGIA;
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
  return info_print;
};

const In = ({ sophieu, data }) => {
  const [stateTable, dispatchTable] = useTableContext();
  const [dataPrint, setDataPrint] = useState([]);

  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Thông tin phân công cho từng nhân viên",
  });
  useLayoutEffect(() => {
    // Thông tin in thợ đế
    const get_unique = (data, key) => {
      let unique_values = [];
      for (let i = 0; i < data.length; i++) {
        if (!unique_values.includes(data[i][key]))
          unique_values.push(data[i][key]);
      }
      return unique_values;
    };
    let list_tho_quai = get_unique(data, "THOQUAI");
    let list_tho_de = get_unique(data, "THODE");

    let infoDetailsPrint = [];
    for (let i = 0; i < list_tho_de.length; i++) {
      let sub_data = data.filter((element) => element.THODE === list_tho_de[i]);
      console.log("sub_data: ", sub_data);
      let _info = {
        NAME: sub_data[0]["TENTHODE"],
        TYPE: "đế",
        PRINT: processing_data(sub_data, "THODE"),
      };
      infoDetailsPrint.push(_info);
    }

    for (let i = 0; i < list_tho_quai.length; i++) {
      let sub_data = data.filter(
        (element) => element.THOQUAI === list_tho_quai[i]
      );
      let _info = {
        NAME: sub_data[0]["TENTHOQUAI"],
        TYPE: "quai",
        PRINT: processing_data(sub_data, "THOQUAI"),
      };
      infoDetailsPrint.push(_info);
    }
    setDataPrint(infoDetailsPrint);
  }, []);

  useLayoutEffect(() => {
    if (dataPrint.length > 0) {
      dispatchTable(actions_table.setModeShowModal(false));
      handelPrint();
    }
  }, [dataPrint]);

  return (
    <div ref={componentRef} className={styles.print_page} id="print_content">
      <div className={styles.each_page}>
        <h1 className={styles.print_header}>Số phiếu: {sophieu}</h1>
        {dataPrint.length > 0 &&
          dataPrint.map((info, index) => (
            <div className={styles.each_nhan_vien}>
              <h1>
                Tên thợ {info["TYPE"]}: {info["NAME"]}
              </h1>

              {info["PRINT"].map((each_giay, index_giay) => (
                <div className={styles.print_object} key={index_giay}>
                  <div className={styles.info_giay}>
                    <table style={{ width: "100%" }}>
                      <tr className={styles.info_row_giay}>
                        <td>
                          <div className={styles.show_content_column}>
                            <lable>{each_giay["MAGIAY"]}</lable>
                          </div>
                        </td>
                        <td className={styles.TENGIAY}>
                          {each_giay["TENGIAY"]}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <TableToPrint
                    columns={each_giay["HEADER_TABLE"]}
                    data={each_giay["TABLE"]}
                    LIST_FORMAT_NUMBER={["TONGSO", "DONGIA", "THANHTIEN"]}
                  />
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default In;
