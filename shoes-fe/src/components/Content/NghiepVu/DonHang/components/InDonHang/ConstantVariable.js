import { rem_to_px } from "~config/ui";

export const INFO_COLS_THO = [
  { header: "ĐẾ", key: "TENMAUDE", width: 3 * rem_to_px },
  { header: "GÓT", key: "TENMAUGOT", width: 3 * rem_to_px },
  { header: "SƯỜN", key: "TENMAUSUON", width: 5 * rem_to_px },
  { header: "CÁ: CÁ DÀI MAY CHỈ", key: "TENMAUCA", width: 8 * rem_to_px },
  { header: "QUAI", key: "TENMAUQUAI", width: 8 * rem_to_px },
  { header: "SIZE", key: "SIZE", width: 12 * rem_to_px },
  { header: "Tổng số", key: "TONGSO", width: 5 * rem_to_px },
  { header: "THỢ ĐẾ", key: "TENTHODE", width: 10 * rem_to_px },
  { header: "THỢ QUAI", key: "TENTHOQUAI", width: 10 * rem_to_px },
];

export const dictInfoPrint = {
  header: 70,
  footer: 116,
  content: {
    gap: 30,
    info_giay_withouimage: 42,
    info_giay_with_image: 155,
    header_table: 41,
    each_row_table: 70,
  },
};
