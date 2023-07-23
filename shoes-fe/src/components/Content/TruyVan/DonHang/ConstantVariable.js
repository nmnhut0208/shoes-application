import { rem_to_px } from "~config/ui";
import { convertDateForReport } from "~utils/processing_date";

export const INFO_COLS_DONHANG = [
  { header: "Số đơn hàng", key: "SODH", width: 21 * rem_to_px },
  {
    header: "Ngày đơn hàng",
    key: "NGAYDH",
    width: 15 * rem_to_px,
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  {
    header: "Ngày giao hàng",
    key: "NGAYGH",
    width: 15 * rem_to_px,
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  { header: "Mã khách hàng", key: "MAKH", width: 16 * rem_to_px },
  { header: "Tên khách hàng", key: "TENKH", width: 25 * rem_to_px },
  { header: "Diễn giãi", key: "DIENGIAI", width: 35 * rem_to_px },
  {
    header: "Số lượng",
    key: "SOLUONG",
    width: 15 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
];
