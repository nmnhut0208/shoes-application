import { rem_to_px } from "~config/ui";

export const COLUMNS = [
  { header: "Số phiếu", key: "SOPHIEU", width: 7 * rem_to_px },
  { header: "Ngày phiếu", key: "NGAYPHIEU", width: 10 * rem_to_px },
  { header: "Khách hàng", key: "MAKH", width: 8 * rem_to_px },
  { header: "Tên khách hàng", key: "TENKH", width: 15 * rem_to_px },
  {
    header: "Số tiền",
    key: "SODUCUOI",
    width: 10 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
  },
  { header: "Diễn giải", key: "DIENGIAIPHIEU", width: 20 * rem_to_px },
];
