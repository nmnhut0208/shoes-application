import { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";
import Html2Pdf from "js-html2pdf";

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
    let nof_row_visited = 0;
    let content = dataPrint[index];
    let have_image = Boolean(listImage[index]);
    let nof_row = content["TABLE"].length;

    let size_MAGIAY = dictInfoPrint["content"]["info_giay_withouimage"];
    if (have_image)
      size_MAGIAY = dictInfoPrint["content"]["info_giay_with_image"];

    let size_bottom_Table =
      size_MAGIAY +
      dictInfoPrint["content"]["header_table"] +
      dictInfoPrint["content"]["gap_in_content"];

    while (nof_row_visited <= nof_row) {
      if (size_page_remain === SIZE_PAGE_A4) {
        if (each_page["content"] && each_page["content"].length > 0) {
          pages.push({ ...each_page });
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
        let size_other_MAGIAY =
          size_bottom_Table + dictInfoPrint["content"]["gap_out_content"];
        let remain_for_rows = size_page_remain - size_other_MAGIAY;
        if (index === dataPrint.length - 1)
          remain_for_rows -= dictInfoPrint["footer"];

        if (remain_for_rows < 0) {
          each_page["margin_bottom"] = size_page_remain;
          size_page_remain = SIZE_PAGE_A4;
          break;
        }
        let nof_row_can_show = Math.floor(
          remain_for_rows / size_each_row_table
        );

        if (nof_row_can_show >= nof_row - nof_row_visited) {
          // show hết phần còn lại
          size_page_remain =
            size_page_remain -
            (nof_row - nof_row_visited) * size_each_row_table -
            size_other_MAGIAY;

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
          nof_row_visited = nof_row;
          if (index === dataPrint.length - 1) {
            // kiểm tra in hết phần tử cuối cùng chưa?
            // show hết tấc cả các dòng của phần tử cuối
            // => xong nhiệm vụ
            size_page_remain = SIZE_PAGE_A4;
          }
          break;
        } else {
          // show ko hết thì phải đủ ít nhất 2 dòng
          // ko đủ 2 dòng thì cho qua new page
          if (nof_row_can_show >= MIN_ROW_MAGIAY_EACHPAGE) {
            each_page["content"] = [
              ...each_page["content"],
              {
                MAGIAY: content["MAGIAY"],
                TENGIAY: content["TENGIAY"],
                HINHANH: listImage[index],
                Table: content["TABLE"].slice(
                  nof_row_visited,
                  nof_row_visited + nof_row_can_show
                ),
              },
            ];

            nof_row_visited += nof_row_can_show;
            size_page_remain =
              size_page_remain -
              nof_row_can_show * size_each_row_table -
              size_other_MAGIAY;
            each_page["margin_bottom"] = size_page_remain;
          } else {
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
    // https://github.com/airarrazaval/html2pdf
    onPrintError: (error) => console.log(error),
    content: () => componentRef.current,
    removeAfterPrint: true,
    print: async (printIframe) => {
      const document = printIframe.contentDocument;
      if (document) {
        const html = document.getElementById("print_content");
        console.log(html);
        const exporter = new Html2Pdf(html, {
          margin: 10,
          filename: "myfile.pdf",
          image: { type: "PNG", quality: 1 },
          html2canvas: {
            scale: 3,
            logging: true,
            dpi: 300,
            letterRendering: true,
            // // quality
            async: false,
            imageTimeout: 15000,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        });
        await exporter.getPdf(true);
      }
    },
  });

  // const pdfRef = useRef();
  // const downloadPDF = () => {
  //   const doc = new jsPDF("l", "pt", "a4");
  //   doc.html(document.querySelector("#print_content"), {
  //     callback: function (pdf) {
  //       pdf.save("thu.pdf");
  //     },
  //   });

  //===============================================
  // const input = pdfRef.current;
  // html2canvas(input).then((canvas) => {
  //   const imgData = canvas.toDataURL("image/png");
  //   const pdf = new jsPDF("p", "pt", "a4", true);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();
  //   const imgWidth = canvas.width;
  //   const imgHeight = canvas.height;
  //   const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //   const imgX = (pdfWidth - imgWidth * ratio) / 2;
  //   const imgY = 30;
  //   pdf.addImage(
  //     imgData,
  //     "PNG",
  //     imgX,
  //     imgY,
  //     imgWidth * ratio,
  //     imgHeight * ratio
  //   );
  //   pdf.save("thu.pdf");
  // });

  //================================================
  // const input = pdfRef.current;
  // domtoimage
  //   .toPng(document.getElementById("print_content"), { quality: 1 })
  //   .then((dataUrl) => {
  //     var doc = new jsPDF();
  //     doc.addImage(dataUrl, "PNG", 0, 0, 943, 1282);
  //     doc.save("thu.pdf");
  //   });

  //===========================================
  // cais nayf toost nhaast naxy giowf
  // const input = pdfRef.current;
  //   html2canvas(input)
  //   .then((canvas) => {
  //     const img = canvas.toDataURL("image/jpg");
  //     const pdf = new jsPDF({
  //       orientation: "p", // landscape
  //       unit: "pt", // points, pixels won't work properly
  //       format: [canvas.width, canvas.height], // set needed dimensions for any element
  //     });
  //     pdf.addImage(img, "PNG", 0, 0, canvas.width, canvas.height);
  //     pdf.save("thu.pdf");
  //   });

  //=============================================
  // TODO: thu https://www.npmjs.com/package/html-to-image
  // };

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
      setInfoDetailsPrint(details);
    }
  }, [dataPrint, listImage, doneGetDiaChi]);

  console.log("infoDetailsPrint: ", infoDetailsPrint);

  useLayoutEffect(() => {
    if (infoDetailsPrint.length > 0) {
      handelPrint();
      // setShowModal(false);
      // downloadPDF();
    }
  }, [infoDetailsPrint]);

  return (
    <div ref={componentRef} className={styles.print_page} id="print_content">
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
                        <td>{info["MAGIAY"]}</td>
                        {info["HINHANH"] && (
                          <td>{<img src={info["HINHANH"]} />}</td>
                        )}
                        <td>{info["TENGIAY"]}</td>
                      </tr>
                    </table>
                  </div>
                  <TableToPrint data={info["Table"]} columns={columns} />
                </div>
              ))}

            {/* break page here */}
            {(index_page < infoDetailsPrint.length - 1 ||
              each_page["margin_bottom"] < dictInfoPrint["footer"]) && (
              <div
                className={styles.footer}
                style={{
                  marginBottom: each_page["margin_bottom"],
                }}
              ></div>
            )}

            {index_page === infoDetailsPrint.length - 1 &&
              each_page["margin_bottom"] > dictInfoPrint["footer"] && (
                <>
                  <br />
                </>
              )}
          </div>
        ))}

      <Signature />
    </div>
  );
};

export default InDonHang;
