import { rem_to_px } from "~config/ui";

export const INFO_COLS_DONHANG = [
  {
    header: "Mã giày",
    key: "MAGIAY",
    width: 21 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Tên giày",
    key: "TENGIAY",
    width: 40 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu đế",
    key: "TENMAUDE",
    width: 12 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Màu sườn",
    key: "TENMAUSUON",
    width: 12 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu cá",
    key: "TENMAUCA",
    width: 12 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu quai",
    key: "TENMAUQUAI",
    width: 12 * rem_to_px,
    enableEditing: false,
  },
  { header: "Size 5", key: "SIZE5", width: 8 * rem_to_px, enableEditing: true },
  { header: "Size 6", key: "SIZE6", width: 8 * rem_to_px, enableEditing: true },
  { header: "Size 7", key: "SIZE7", width: 8 * rem_to_px, enableEditing: true },
  { header: "Size 8", key: "SIZE8", width: 8 * rem_to_px, enableEditing: true },
  { header: "Size 9", key: "SIZE9", width: 8 * rem_to_px, enableEditing: true },
  { header: "Size 0", key: "SIZE0", width: 8 * rem_to_px, enableEditing: true },
  {
    header: "Số lượng",
    key: "SOLUONG",
    width: 24 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Giá bán",
    key: "GIABAN",
    width: 24 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Thành tiền",
    key: "THANHTIEN",
    width: 24 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Diễn giải",
    key: "DIENGIAIPHIEU",
    width: 48 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "In hiệu",
    key: "INHIEU",
    width: 48 * rem_to_px,
    enableEditing: false,
  },
];

export const COLS_HAVE_SUM_FOOTER = [
  "SIZE5",
  "SIZE6",
  "SIZE7",
  "SIZE8",
  "SIZE9",
  "SIZE0",
  "SOLUONG",
  "THANHTIEN",
];

export const COL_GIAY_KHACHHANG = [
  {
    header: "Mã giày",
    key: "MAGIAY",
    width: 21 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Tên giày",
    key: "TENGIAY",
    width: 40 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu đế",
    key: "TENMAUDE",
    width: 12 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Màu gót",
    key: "TENMAUGOT",
    width: 12 * rem_to_px,
    enableEditing: true,
  },
  {
    header: "Màu sườn",
    key: "TENMAUSUON",
    width: 12 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu cá",
    key: "TENMAUCA",
    width: 12 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu quai",
    key: "TENMAUQUAI",
    width: 12 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Giá bán",
    key: "DONGIA",
    width: 24 * rem_to_px,
    enableEditing: false,
  },
];
