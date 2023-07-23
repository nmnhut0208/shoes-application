import { rem_to_px } from "~config/ui";

export const COL_INFO_SIZE = [
  { key: 0, name: "SIZE0" },
  { key: 1, name: "SIZE1" },
  { key: 5, name: "SIZE5" },
  { key: 6, name: "SIZE6" },
  { key: 7, name: "SIZE7" },
  { key: 8, name: "SIZE8" },
  { key: 9, name: "SIZE9" },
];

export const fontSize = "1.4rem";

export const INFO_COLS_THO = [
  { header: "ĐẾ", key: "TENMAUDE", width: 7 * rem_to_px },
  { header: "GÓT", key: "TENMAUGOT", width: 7 * rem_to_px },
  { header: "SƯỜN", key: "TENMAUSUON", width: 9 * rem_to_px },
  {
    header: "CÁ: CÁ DÀI MAY CHỈ",
    key: "TENMAUCA",
    width: 11 * rem_to_px,
  },
  { header: "QUAI", key: "TENMAUQUAI", width: 9 * rem_to_px },
  { header: "SIZE", key: "SIZE", width: 16 * rem_to_px },
  {
    header: "Tổng số",
    key: "TONGSO",
    width: 5 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Đơn giá",
    key: "DONGIA",
    width: 6 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Thành tiền",
    key: "THANHTIEN",
    width: 6 * rem_to_px,
    textAlign: "right",
  },
];
