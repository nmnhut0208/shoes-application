import { rem_to_px } from "~config/ui";
import { convertDateForReport } from "~utils/processing_date";

export const COLUMNS = [
  { header: "Số phiếu", key: "SOPHIEU", width: 7 * rem_to_px },
  {
    header: "Ngày phiếu",
    key: "NGAYPHIEU",
    width: 7 * rem_to_px,
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  { header: "Khách hàng", key: "MAKH", width: 8 * rem_to_px },
  { header: "Tên khách hàng", key: "TENKH", width: 15 * rem_to_px },
  {
    header: "Số tiền",
    key: "SODUCUOI",
    width: 7 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  { header: "Diễn giải", key: "DIENGIAIPHIEU", width: 20 * rem_to_px },
];
