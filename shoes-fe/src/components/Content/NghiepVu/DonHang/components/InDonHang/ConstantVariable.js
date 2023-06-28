import { rem_to_px } from "~config/ui";

export const COL_INFO_SIZE = [
  { key: 0, name: "SIZE0" },
  { key: 5, name: "SIZE5" },
  { key: 6, name: "SIZE6" },
  { key: 7, name: "SIZE7" },
  { key: 8, name: "SIZE8" },
  { key: 9, name: "SIZE9" },
];

export const INFO_COLS_THO = [
  { header: "ĐẾ", key: "TENMAUDE", width: 3 * rem_to_px },
  { header: "GÓT", key: "TENMAUGOT", width: 3 * rem_to_px },
  { header: "SƯỜN", key: "TENMAUSUON", width: 5 * rem_to_px },
  { header: "CÁ: CÁ DÀI", key: "TENMAUCA", width: 8 * rem_to_px },
  { header: "QUAI", key: "TENMAUQUAI", width: 8 * rem_to_px },
  { header: "SIZE", key: "SIZE", width: 12 * rem_to_px },
  // { header: "SL", key: "TONGSO", width: 1 * rem_to_px },
  { header: "THỢ ĐẾ", key: "TENTHODE", width: 10 * rem_to_px },
  { header: "THỢ QUAI", key: "TENTHOQUAI", width: 10 * rem_to_px },
];

export const dictInfoPrint = {
  header: 50,
  margin_header: 30,
  footer: 150,
  content: {
    gap_in_content: 10,
    gap_out_content: 40,
    info_giay_withouimage: 45,
    info_giay_with_image: 160,
    header_table: 46,
    each_row_table: 75,
  },
};
