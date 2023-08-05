import { rem_to_px } from "~config/ui";
import { convertDateForReport } from "~utils/processing_date";

export const INFO_COLS_DONHANG = [
  { header: "Số đơn hàng", key: "SODH", width: 21 * rem_to_px },
  {
    header: "Ngày đơn hàng",
    key: "NGAYDH",
    width: 13 * rem_to_px,
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  { header: "Mã khách hàng", key: "MAKH", width: 16 * rem_to_px },
  { header: "Tên khách hàng", key: "TENKH", width: 25 * rem_to_px },
  { header: "Diễn dãi", key: "DIENGIAIPHIEU", width: 20 * rem_to_px },
  {
    header: "Số lượng chưa phân công",
    key: "SOLUONG",
    width: 21 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
];

export const INFO_COLS_CHITIET_PHANCONG = [
  { header: "Số đơn hàng", key: "SODH", width: 15 * rem_to_px },
  { header: "Mã giày", key: "MAGIAY", width: 20 * rem_to_px },
  { header: "Màu đế", key: "MAUDE", width: 10 * rem_to_px },
  { header: "Màu gót", key: "MAUGOT", width: 10 * rem_to_px },
  { header: "Màu sườn", key: "MAUSUON", width: 10 * rem_to_px },
  { header: "Màu cá", key: "MAUCA", width: 10 * rem_to_px },
  { header: "Màu quai", key: "MAUQUAI", width: 10 * rem_to_px },
  { header: "Thợ đế", key: "THODE", width: 11 * rem_to_px },
  { header: "Thợ quai", key: "THOQUAI", width: 11 * rem_to_px },
  {
    header: "Size 5",
    key: "SIZE5",
    width: 7 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  {
    header: "Size 6",
    key: "SIZE6",
    width: 7 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  {
    header: "Size 7",
    key: "SIZE7",
    width: 7 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  {
    header: "Size 8",
    key: "SIZE8",
    width: 7 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  {
    header: "Size 9",
    key: "SIZE9",
    width: 7 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  {
    header: "Size 0",
    key: "SIZE0",
    width: 7 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  {
    header: "Size 1",
    key: "SIZE1",
    width: 7 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  { header: "Tên giày", key: "TENGIAY", width: 60 * rem_to_px },
];
