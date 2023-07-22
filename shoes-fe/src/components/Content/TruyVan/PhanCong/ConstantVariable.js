import { rem_to_px } from "~config/ui";
import { convertDateForReport } from "~utils/processing_date";

export const INFO_COLS_PHANCONG = [
  { header: "Số phiếu", key: "SOPHIEU", width: 10 * rem_to_px },
  {
    header: "Ngày phiếu",
    key: "NGAYPHIEU",
    width: 10 * rem_to_px,
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  { header: "Diễn dãi", key: "DIENGIAIPHIEU", width: 40 * rem_to_px },
];
