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

export const INFO_COLS_THO = [
  { header: "ĐẾ", key: "TENMAUDE", width: 7 * rem_to_px, textAlign: "center" },
  {
    header: "GÓT",
    key: "TENMAUGOT",
    width: 7 * rem_to_px,
    textAlign: "center",
  },
  {
    header: "SƯỜN",
    key: "TENMAUSUON",
    width: 8 * rem_to_px,
    textAlign: "center",
  },
  {
    header: "CÁ: CÁ DÀI",
    key: "TENMAUCA",
    width: 12 * rem_to_px,
    textAlign: "center",
  },
  {
    header: "QUAI",
    key: "TENMAUQUAI",
    width: 9 * rem_to_px,
    textAlign: "center",
  },
  { header: "SIZE", key: "SIZE", width: 16 * rem_to_px },
  {
    header: "GIÁ BÁN",
    key: "GIABAN",
    width: 8 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "THỢ ĐẾ",
    key: "TENTHODE",
    width: 8 * rem_to_px,
    textAlign: "center",
  },
  {
    header: "THỢ QUAI",
    key: "TENTHOQUAI",
    width: 8 * rem_to_px,
    textAlign: "center",
  },
];
//===========================
export const fontSize = "1.4rem";
