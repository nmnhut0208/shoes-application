import { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

import styles from "./InDonHang.module.scss";
import {
  INFO_COLS_THO,
  COL_INFO_SIZE,
  dictInfoPrint,
} from "./ConstantVariable";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import {
  TableToPrint,
  SizeColumnInPrint,
  Signature,
} from "~common_tag/reports";
import { convertDateForReport } from "~utils/processing_date";
import { getImageFromMAGIAY, getDiaChiKhachHang } from "./helper";

const getInfoBreakPage = (dataPrint, listImage) => {
  let pages = [];
  let index = 0;
  let each_page = { content: [] };
  const MIN_ROW_MAGIAY_EACHPAGE = 2;
  const SIZE_PAGE_A4 = 790;
  let size_page_remain = SIZE_PAGE_A4;
  const margin_header = dictInfoPrint["margin_header"];
  const size_each_row_table = dictInfoPrint["content"]["each_row_table"];

  while (index < dataPrint.length) {
    console.log("=================================");
    console.log("index: ", index);
    let nof_row_visited = 0;
    let content = dataPrint[index];
    let have_image = Boolean(listImage[index]);
    let nof_row = content["TABLE"].length;

    console.log("size_page_remain: ", size_page_remain);
    console.log("have_image: ", have_image);
    console.log("nof_row_visited: ", nof_row_visited);

    let size_MAGIAY = dictInfoPrint["content"]["info_giay_withouimage"];
    if (have_image)
      size_MAGIAY = dictInfoPrint["content"]["info_giay_with_image"];

    let size_bottom_Table =
      size_MAGIAY +
      dictInfoPrint["content"]["header_table"] +
      dictInfoPrint["content"]["gap_in_content"];

    while (nof_row_visited <= nof_row) {
      console.log("************************");
      console.log("each_page: ", { ...each_page });
      console.log("size_page_remain: ", size_page_remain);
      console.log("index: ", index);
      if (size_page_remain === SIZE_PAGE_A4) {
        console.log("''''''''''''''''''''''''''");
        console.log("start new page");
        if (each_page["content"] && each_page["content"].length > 0) {
          pages.push({ ...each_page });
          console.log("pages: ", pages, { ...each_page });
        }
        // start new page
        each_page = {};
        each_page["header"] = 1;
        size_page_remain -= dictInfoPrint["header"] + margin_header;
        each_page["content"] = [];
      }
      if (nof_row_visited === nof_row) break;
      // show content
      while (size_page_remain > 10) {
        console.log("................................");
        let size_other_MAGIAY =
          size_bottom_Table + dictInfoPrint["content"]["gap_out_content"];
        let remain_for_rows =
          size_page_remain - size_other_MAGIAY - dictInfoPrint["footer"];
        console.log("remain_for_rows: ", remain_for_rows);

        // if (remain_for_rows < size_each_row_table) {
        if (remain_for_rows < 0) {
          each_page["margin_bottom"] = size_page_remain;
          size_page_remain = SIZE_PAGE_A4;
          break;
        }
        let nof_row_can_show = Math.floor(
          remain_for_rows / size_each_row_table
        );
        console.log("nof_row_can_show: ", nof_row_can_show);
        console.log("nof_row_visited: ", nof_row_visited);
        console.log("nof_row: ", nof_row);
        console.log("so dong show: ", nof_row - nof_row_visited);
        if (nof_row_can_show >= nof_row - nof_row_visited) {
          console.log("nof_row_can_show >= nof_row - nof_row_visited");
          // show hết phần còn lại
          size_page_remain =
            size_page_remain -
            (nof_row - nof_row_visited) * size_each_row_table -
            size_other_MAGIAY;
          console.log("size_page_remain: ", size_page_remain);
          console.log("eachpage truoc: ", { ...each_page });
          console.log("push content into each_page 1");
          console.log("content: ", content);
          each_page["content"] = [
            ...each_page["content"],
            {
              MAGIAY: content["MAGIAY"],
              TENGIAY: content["TENGIAY"],
              HINHANH: listImage[index],
              Table: content["TABLE"].slice(nof_row_visited, nof_row),
            },
          ];

          each_page["margin_bottom"] = size_page_remain;
          console.log("after add: ", { ...each_page });
          nof_row_visited = nof_row;
          if (index === dataPrint.length - 1) {
            // kiểm tra in hết phần tử cuối cùng chưa?
            size_page_remain = SIZE_PAGE_A4;
          }
          break;
        } else {
          // show ko hết thì phải đủ ít nhất 3 dòng
          // ko đủ 3 dòng thì cho qua new page
          if (nof_row_can_show >= MIN_ROW_MAGIAY_EACHPAGE) {
            console.log("nof_row_can_show >= MIN_ROW_MAGIAY_EACHPAGE");
            console.log(
              "nof_row visited: ",
              nof_row_visited + MIN_ROW_MAGIAY_EACHPAGE
            );
            console.log("push content into each_page 2");
            console.log("eachpage truoc: ", { ...each_page });
            each_page["content"] = [
              ...each_page["content"],
              {
                MAGIAY: content["MAGIAY"],
                TENGIAY: content["TENGIAY"],
                HINHANH: listImage[index],
                Table: content["TABLE"].slice(
                  nof_row_visited,
                  nof_row_visited + MIN_ROW_MAGIAY_EACHPAGE
                ),
              },
            ];

            console.log("after add: ", { ...each_page });
            nof_row_visited += MIN_ROW_MAGIAY_EACHPAGE;
            size_page_remain =
              size_page_remain -
              MIN_ROW_MAGIAY_EACHPAGE * size_each_row_table -
              size_other_MAGIAY;
            each_page["margin_bottom"] = size_page_remain;
          } else {
            console.log("else cuoi cung");
            // số lượng dòng còn lại sẽ qua trang mới
            each_page["margin_bottom"] = size_page_remain;
            size_page_remain = SIZE_PAGE_A4;
            break;
          }
        }
      }
    }
    index += 1;
  }
  return pages;
};

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

          info["TABLE"][j]["TONGSO"] = tongso;
          info["TABLE"][j]["SIZE"] = (
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

  useEffect(() => {
    if (dataPrint.length > 0 && listImage.length > 0 && doneGetDiaChi) {
      let details = getInfoBreakPage(dataPrint, listImage);
      console.log("details: ", details);
      setInfoDetailsPrint(details);
    }
  }, [dataPrint, listImage, doneGetDiaChi]);

  console.log("infoDetailsPrint: ", infoDetailsPrint);

  useLayoutEffect(() => {
    if (infoDetailsPrint.length > 0) {
      handelPrint();
      // setShowModal(false);
    }
  }, [infoDetailsPrint]);

  return (
    <div ref={componentRef} className={styles.print_page}>
      {infoDetailsPrint.length > 0 &&
        infoDetailsPrint.map((each_page, index_page) => (
          <div key={index_page}>
            <br />
            <br />
            <div className={styles.print_header}>
              <h1>Số đơn hàng: {header["SODH"]}</h1>
              <h1>{header["TENKH"]}</h1>
            </div>

            <div className={styles.print_header}>
              <h2>Ngày: {convertDateForReport(header["NGAYDH"])}</h2>
              <h2>{header["DIACHI"]}</h2>
            </div>

            {each_page &&
              each_page["content"].length > 0 &&
              each_page["content"].map((info, index) => (
                <div className={styles.print_object} key={index}>
                  <div className={styles.info_giay}>
                    <table style={{ width: "100%" }}>
                      <tr className={styles.info_row_giay}>
                        <td className={styles.TENGIAY}>{info["TENGIAY"]}</td>
                        <td>
                          {info["HINHANH"] && <img src={info["HINHANH"]} />}
                        </td>
                        <td>{info["MAGIAY"]}</td>
                      </tr>
                    </table>
                  </div>
                  <TableToPrint data={info["Table"]} columns={columns} />
                </div>
              ))}

            <p>====================================================</p>
            {/* break page here */}
            {(index_page < infoDetailsPrint.length - 1 ||
              each_page["margin_bottom"] < 200) && (
              <div
                className={styles.footer}
                style={{
                  marginBottom: each_page["margin_bottom"],
                  backgroundColor: "red",
                }}
              ></div>
            )}

            {index_page === infoDetailsPrint.length - 1 &&
              each_page["margin_bottom"] > 200 && (
                <>
                  <br />
                  <br />
                </>
              )}
            <p>====================================================</p>
          </div>
        ))}

      <Signature />
    </div>
  );
};

export default InDonHang;
