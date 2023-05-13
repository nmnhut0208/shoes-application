import { rem_to_px } from "~config/ui";

export const INFO_COLS_THO = [
  { header: "ĐẾ", key: "Màu đế", width: 3 * rem_to_px },
  { header: "GÓT", key: "Màu gót", width: 3 * rem_to_px },
  { header: "SƯỜN", key: "Màu sườn", width: 5 * rem_to_px },
  { header: "CÁ: CÁ DÀI MAY CHỈ", key: "Màu cá", width: 8 * rem_to_px },
  { header: "QUAI", key: "Màu quai", width: 8 * rem_to_px },
  { header: "SIZE", key: "Size", width: 15 * rem_to_px },
  { header: "Tổng số", key: "Tổng số", width: 5 * rem_to_px },
  { header: "THỢ ĐẾ", key: "Thợ đế", width: 10 * rem_to_px },
  { header: "THỢ QUAI", key: "Thợ đế", width: 10 * rem_to_px },
  { header: "ĐƠN HÀNG", key: "Số đơn hàng", width: 15 * rem_to_px },
];

export const processingInfoColumnTable = (list_key) => {
  const infoColumns = [];
  for (var obj in list_key) {
    const info = {
      header: list_key[obj]["header"],
      size: list_key[obj]["width"],
      accessorKey: list_key[obj]["key"],
      key: list_key[obj]["key"].toLowerCase(),
    };
    infoColumns.push(info);
  }
  return infoColumns;
};
