import { rem_to_px } from "~config/ui";

export const INFO_COLS_DONHANG = [
  { key: "STT", width: 7 * rem_to_px, enableEditing: false },
  { key: "Mã giày", width: 21 * rem_to_px, enableEditing: false },
  { key: "Tên giày", width: 40 * rem_to_px, enableEditing: false },
  { key: "Màu đế", width: 12 * rem_to_px, enableEditing: true },
  { key: "Màu sườn", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu cá", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu quai", width: 12 * rem_to_px, enableEditing: false },
  { key: "Size 5", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 6", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 7", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 8", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 9", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 0", width: 8 * rem_to_px, enableEditing: true },
  { key: "Số lượng", width: 24 * rem_to_px, enableEditing: false },
  { key: "Giá bán", width: 24 * rem_to_px, enableEditing: true },
  { key: "Thành tiền", width: 24 * rem_to_px, enableEditing: false },
  { key: "Diễn giải", width: 48 * rem_to_px, enableEditing: false },
  { key: "In hiệu", width: 48 * rem_to_px, enableEditing: false },
];

export const COLS_HAVE_SUM_FOOTER = [
  "Size 5",
  "Size 6",
  "Size 7",
  "Size 8",
  "Size 9",
  "Size 0",
  "Số lượng",
  "Thành tiền",
];

export const COL_GIAY_KHACHHANG = [
  { key: "STT", width: 7 * rem_to_px, enableEditing: false },
  { key: "Mã giày", width: 21 * rem_to_px, enableEditing: false },
  { key: "Tên giày", width: 40 * rem_to_px, enableEditing: false },
  { key: "Màu đế", width: 12 * rem_to_px, enableEditing: true },
  { key: "Màu gót", width: 12 * rem_to_px, enableEditing: true },
  { key: "Màu sườn", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu cá", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu quai", width: 12 * rem_to_px, enableEditing: false },
  { key: "Giá bán", width: 24 * rem_to_px, enableEditing: false },
];
