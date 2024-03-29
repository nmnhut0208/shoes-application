import { rem_to_px } from "~config/ui";

export const LIST_COLS_FOOTER_SUM = ["SOLUONG", "THANHTIEN"];
export const LIST_FORMAT_NUMBER = ["DONGIA", "THANHTIEN"];

export const fontSize = "1.4rem";

export const INFO_TABLE = [
  {
    header: "Mã giày",
    key: "MAGIAY",
    width: 20 * rem_to_px,
    textAlign: "left",
  },
  {
    header: "SL",
    key: "SOLUONG",
    width: 6 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Đơn giá",
    key: "DONGIA",
    width: 7 * rem_to_px,
    textAlign: "right",
    muiTableBodyCellProps: {
      align: "right",
    },
  },
  {
    header: "Thành tiền",
    key: "THANHTIEN",
    width: 10 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Mã quai",
    key: "MAQUAI",
    width: 7 * rem_to_px,
    textAlign: "left",
  },
  {
    header: "Mã đế",
    key: "MADE",
    width: 6.5 * rem_to_px,
  },
  {
    header: "Phiếu PC",
    key: "PHIEUPC",
    width: 10 * rem_to_px,
  },
  {
    header: "Diễn giải",
    key: "DIENGIAIPHIEU",
    width: 7 * rem_to_px,
  },
];

//===========================================================

export const INFO_TABLE_FOOTER = [
  {
    header: "Đơn giá",
    key: "DONGIA",
    width: 10 * rem_to_px,
    textAlign: "right",
  },

  {
    header: "SL",
    key: "SOLUONG",
    width: 10 * rem_to_px,
    textAlign: "right",
  },
];
