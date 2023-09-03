import { rem_to_px } from "~config/ui";

export const INFO_COLS_DONHANG = [
  {
    header: "Mã giày",
    key: "MAGIAY",
    width: 21 * rem_to_px,
  },
  {
    header: "Màu đế",
    key: "MAUDE",
    width: 10 * rem_to_px,
  },
  {
    header: "Màu gót",
    key: "MAUGOT",
    width: 10 * rem_to_px,
  },
  {
    header: "Màu sườn",
    key: "MAUSUON",
    width: 10 * rem_to_px,
  },
  {
    header: "Màu cá",
    key: "MAUCA",
    width: 10 * rem_to_px,
  },
  {
    header: "Màu quai",
    key: "MAUQUAI",
    width: 10 * rem_to_px,
  },
  { header: "Size 5", key: "SIZE5", width: 8 * rem_to_px },
  { header: "Size 6", key: "SIZE6", width: 8 * rem_to_px },
  { header: "Size 7", key: "SIZE7", width: 8 * rem_to_px },
  { header: "Size 8", key: "SIZE8", width: 8 * rem_to_px },
  { header: "Size 9", key: "SIZE9", width: 8 * rem_to_px },
  { header: "Size 0", key: "SIZE0", width: 8 * rem_to_px },
  { header: "Size 1", key: "SIZE1", width: 8 * rem_to_px },
  {
    header: "Số lượng",
    key: "SOLUONG",
    width: 10 * rem_to_px,
  },
  {
    header: "Giá bán",
    key: "GIABAN",
    width: 10 * rem_to_px,
  },
  {
    header: "Thành tiền",
    key: "THANHTIEN",
    width: 15 * rem_to_px,
  },
  {
    header: "Diễn giải",
    key: "DIENGIAIDONG",
    width: 30 * rem_to_px,
  },
  {
    header: "In hiệu",
    key: "INHIEU",
    width: 30 * rem_to_px,
  },
  {
    header: "Tên giày",
    key: "TENGIAY",
    width: 50 * rem_to_px,
  },
];

export const COLS_HAVE_SUM_FOOTER = [
  "SIZE5",
  "SIZE6",
  "SIZE7",
  "SIZE8",
  "SIZE9",
  "SIZE0",
  "SIZE1",
  "SOLUONG",
  "THANHTIEN",
];

export const COLS_HAVE_SELECT_INPUT = [
  "MAUDE",
  "MAUGOT",
  "MAUSUON",
  "MAUCA",
  "MAUQUAI",
];
