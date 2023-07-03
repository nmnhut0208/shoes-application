import { useReactToPrint } from "react-to-print";
import { useRef, useLayoutEffect, useMemo } from "react";
import { useTableContext, actions_table } from "~table_context";
import { rem_to_px } from "~config/ui";
import styles from "./In.module.scss";
import { TableToPrint } from "~common_tag/reports";
import {
  processingInfoColumnTable,
  processingInfoColumnTableHaveFooter,
} from "~utils/processing_data_table";

const COLS_HAVE_SUM_FOOTER = ["SOLUONG", "THANHTIEN"];

const _style_component_cell = {
  fontSize: "1.5rem",
  fontFamily: "Helvetica",
  borderRight: "0.25rem solid rgba(0, 0, 0, 1)",
  borderBottom: "0.25rem solid rgba(0, 0, 0, 1)",
};

const _style_component_head = {
  fontSize: "1.5rem",
  padding: "1rem",
  lineHeight: "3rem",
  fontFamily: "Gill Sans",
  fontWeight: "900",
  borderRight: "0.25rem solid rgba(0, 0, 0, 1)",
  borderBottom: "0.25rem solid rgba(0, 0, 0, 1)",
};

export const border_text_table_config = {
  muiTablePaperProps: {
    elevation: 0,
    sx: { borderRadius: "0", borderLeft: "0.25rem solid rgba(0, 0, 0, 1)" },
  },
  muiTableHeadCellProps: {
    sx: { ..._style_component_head },
  },
  muiTableBodyCellProps: { sx: { ..._style_component_cell } },
  muiTableFooterCellProps: { sx: { ..._style_component_cell } },
  muiTableContainerProps: {
    sx: {
      fontSize: "1.5rem",
      fontFamily: "Helvetica",
      border: "none",
      borderTop: "0.25rem solid rgba(0, 0, 0, 1)",
    },
  },
};

const list_key = [
  { header: "Mã Hàng", key: "MAGIAY", width: 8 * rem_to_px },
  { header: "Tên Hàng", key: "TENGIAY", width: 10 * rem_to_px },
  {
    header: "SL",
    key: "SOLUONG",
    width: 2 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
  },
  {
    header: "Đơn giá",
    key: "DONGIA",
    width: 4 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
  },
  {
    header: "Thành tiền",
    key: "THANHTIEN",
    width: 5 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
  },
  { header: "Số đơn hàng", key: "SODH", width: 6 * rem_to_px },
];

const num_div = 8;

const In = ({ data }) => {
  const [stateTable, dispatchTable] = useTableContext();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Thông tin phân công",
  });
  const componentRef = useRef();
  const num_batch = useMemo(() => {
    return data["table"].length / num_div;
  }, []);
  const batch_data = useMemo(() => {
    const batch_data_init = [];
    for (let i = 0; i < num_batch; i++) {
      batch_data_init.push(data["table"].slice(i * num_div, (i + 1) * num_div));
    }
    return batch_data_init;
  }, []);

  const infoColumns = useMemo(() => {
    return processingInfoColumnTable(list_key);
  }, []);

  const infoColumns_Footer = useMemo(() => {
    return processingInfoColumnTableHaveFooter(
      list_key,
      COLS_HAVE_SUM_FOOTER,
      data
    );
  }, []);

  console.log("columns: ", data["table"].length);
  useLayoutEffect(() => {
    dispatchTable(actions_table.setModeShowModal(false));
    handelPrint();
  }, []);
  return (
    <div ref={componentRef}>
      {batch_data.map((data_info, index) => (
        <div className={styles.container}>
          {/* {index !== 0 ? <br /> : <></>}  */}
          <div className={styles.invoice__header}>
            {index === 0 ? <h1 className={styles.invoice}>Hóa Đơn</h1> : <></>}
            {/* <h1 className={styles.invoice}>Hóa Đơn</h1> */}
            {index !== 0 ? (
              <div className={styles.invoice__info}>
                <h2>Số: {data["SOPHIEU"]}</h2>
                <h2>Ngày: {data["NGAYPHIEU"]}</h2>
              </div>
            ) : (
              <div className={styles.invoice__info_header}>
                <h2>Số: {data["SOPHIEU"]}</h2>
                <h2>Ngày: {data["NGAYPHIEU"]}</h2>
              </div>
            )}
          </div>
          <h2>Khách Hàng: {data["TENKH"]}</h2>
          <h2>Địa Chỉ: {data["DIACHI"]}</h2>
          <br />
          {index === batch_data.length - 1 ? (
            <TableToPrint
              columns={infoColumns_Footer}
              data={data_info}
              border_text_table_config={border_text_table_config}
            />
          ) : (
            <div className={styles.distance_table}>
              <TableToPrint
                columns={infoColumns}
                data={data_info}
                border_text_table_config={border_text_table_config}
                // className={styles.distance_table}
              />
            </div>
          )}
          {/* <Table columns={infoColumns} data={data_info} />; */}
          {index === batch_data.length - 1 ? (
            <div className={styles.footer}>
              <h2>Người nhận hàng</h2>
              <h2>Người lập</h2>
            </div>
          ) : (
            <></>
          )}
          {/* <div className={styles.footer}>
            <h2>Người nhận hàng</h2>
            <h2>Người lập</h2>
          </div> */}
        </div>
      ))}
      {/* <div className={styles.container}>
        <div className={styles.invoice__header}>
          <h1 className={styles.invoice}>Hóa Đơn</h1>
          <div className={styles.invoice__info}>
            <h2>Số: {data["SOPHIEU"]}</h2>
            <h2>Ngày: {data["NGAYPHIEU"]}</h2>
          </div>
        </div>

        <h2>Khách Hàng: {data["TENKH"]}</h2>
        <h2>Địa Chỉ: {data["DIACHI"]}</h2>
        <Table columns={infoColumns} data={data["table"]} />
        <div className={styles.footer}>
          <h2>Người nhận hàng</h2>
          <h2>Người lập</h2>
        </div>
      </div> */}
    </div>
  );
};

export default In;
