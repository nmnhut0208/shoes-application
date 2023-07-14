import { rem_to_px } from "~config/ui";
import { convertDateForReport } from "~utils/processing_date";

export const LIST_COLS_FOOTER_SUM = [
  "SIZE0",
  "SIZE1",
  "SIZE5",
  "SIZE6",
  "SIZE7",
  "SIZE8",
  "SIZE9",
  "SOLUONG",
  "THANHTIEN",
];

export const fontSize = "1.4rem";

export const INFO_TABLE = [
  { header: "Số ĐH", key: "SODH", width: 11 * rem_to_px, textAlign: "left" },
  {
    header: "Ngày ĐH",
    key: "NGAYDH",
    width: 7.5 * rem_to_px,
    textAlign: "left",
  },
  {
    header: "Tên Khách Hàng",
    key: "TENKH",
    width: 12 * rem_to_px,
    textAlign: "left",
  },
  {
    header: "Tên Giày",
    key: "TENGIAY",
    width: 20 * rem_to_px,
    textAlign: "left",
  },
  {
    header: "Size0",
    key: "SIZE0",
    width: 5 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Size1",
    key: "SIZE1",
    width: 5 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Size5",
    key: "SIZE5",
    width: 5 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Size6",
    key: "SIZE6",
    width: 5 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Size7",
    key: "SIZE7",
    width: 5 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Size8",
    key: "SIZE8",
    width: 5 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Size9",
    key: "SIZE9",
    width: 5 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Số lượng",
    key: "SOLUONG",
    width: 5.5 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Đơn giá",
    key: "GIABAN",
    width: 6 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Thành tiền",
    key: "THANHTIEN",
    width: 8.5 * rem_to_px,
    textAlign: "right",
  },
];
