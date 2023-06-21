import { useReactToPrint } from "react-to-print";
import { useRef, useLayoutEffect, useMemo } from "react";
import { useTableContext, actions_table } from "~table_context";
import MaterialReactTable from "material-react-table";
import { rem_to_px } from "~config/ui";
import styles from "./In.module.scss";

const COLS_HAVE_SUM_FOOTER = ["SOLUONG", "THANHTIEN"];

const Table = ({ columns, data }) => {
  return (
    <MaterialReactTable
      muiTablePaperProps={{
        //customize paper styles
        sx: {
          borderRadius: "0",
          borderLeft: "0.2rem solid rgba(0, 0, 0, 0.3)",
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          borderRight: "0.2rem solid rgba(0, 0, 0, 0.3)",
          borderBottom: "0.2rem solid rgba(0, 0, 0, 0.3)",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          borderRight: "0.2rem solid rgba(0, 0, 0, 0.3)",
          borderBottom: "0.2rem solid rgba(0, 0, 0, 0.3)",
        },
      }}
      muiTableFooterCellProps={{
        sx: {
          borderRight: "0.2rem solid rgba(0, 0, 0, 0.3)",
          borderBottom: "0.2rem solid rgba(0, 0, 0, 0.3)",
        },
      }}
      enableTopToolbar={false}
      columns={columns}
      data={data}
      // components
      enableColumnActions={false}
      enableSorting={false}
      // enable phân trang
      enablePagination={false}
      enableBottomToolbar={false}
    />
  );
};

const list_key = [
  { header: "Mã Hàng", key: "MAGIAY", width: 10 * rem_to_px },
  { header: "Tên Hàng", key: "TENGIAY", width: 4 * rem_to_px },
  { header: "SL", key: "SOLUONG", width: 4 * rem_to_px },
  { header: "Đơn giá", key: "DONGIA", width: 4 * rem_to_px },
  { header: "Thành tiền", key: "THANHTIEN", width: 4 * rem_to_px },
  { header: "Số đơn hàng", key: "SODH", width: 4 * rem_to_px },
];

const In = ({ data }) => {
  const [stateTable, dispatchTable] = useTableContext();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Thông tin phân công",
  });
  const componentRef = useRef();

  const infoColumns = useMemo(() => {
    const infoColumnsInit = [];
    for (var obj in list_key) {
      const info = {
        header: list_key[obj]["header"],
        size: list_key[obj]["width"],
        accessorKey: list_key[obj]["key"],
        key: list_key[obj]["key"],
      };
      if (list_key[obj]["key"] === "TENGIAY")
        info["Footer"] = () => <div>Tổng cộng: </div>;
      if (COLS_HAVE_SUM_FOOTER.includes(list_key[obj]["key"])) {
        let sum_value = data["table"].reduce(
          (total, row) => total + row[list_key[obj]["key"]],
          0
        );
        info["Footer"] = () => <div>{sum_value}</div>;
      }
      infoColumnsInit.push(info);
    }
    return infoColumnsInit;
  }, []);
  // console.log("In: ", data);
  useLayoutEffect(() => {
    dispatchTable(actions_table.setModeShowModal(false));
    handelPrint();
  }, []);
  return (
    <div ref={componentRef}>
      <div className={styles.container}>
        <div className={styles.invoice__header}>
          <h1 className={styles.invoice}>Hóa Đơn</h1>
          <div className={styles.invoice__info}>
            <h2>Số: {data["SOPHIEU"]}</h2>
            <h2>Ngày: {data["NGAYPHIEU"]}</h2>
          </div>
        </div>

        <h2>Khách Hàng: {data["TENKH"]}</h2>
        <h2>Địa Chỉ: {data["DIACHI"]}</h2>
      </div>

      <Table columns={infoColumns} data={data["table"]} />
      <div className={styles.footer}>
        <h2>Người nhận hàng</h2>
        <h2>Người lập</h2>
      </div>
    </div>
  );
};

export default In;
