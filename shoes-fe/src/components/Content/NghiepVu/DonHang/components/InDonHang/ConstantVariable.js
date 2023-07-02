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
  { header: "SƯỜN", key: "TENMAUSUON", width: 3 * rem_to_px },
  { header: "CÁ: CÁ DÀI", key: "TENMAUCA", width: 3 * rem_to_px },
  { header: "QUAI", key: "TENMAUQUAI", width: 3 * rem_to_px },
  { header: "SIZE", key: "SIZE", width: 3 * rem_to_px },
  { header: "THỢ ĐẾ", key: "TENTHODE", width: 3 * rem_to_px },
  { header: "THỢ QUAI", key: "TENTHOQUAI", width: 3 * rem_to_px },
];

//=========================================================
export const dictInfoPrint = {
  header: 60,
  margin_header: 40,
  footer: 130,
  content: {
    gap_in_content: 10,
    gap_out_content: 40,
    info_giay_withouimage: 45,
    info_giay_with_image: 161,
    header_table: 36,
    each_row_table: 57,
  },
};

//===========================
export const fontSize = "1.7rem";

const font_header = {
  fontSize: fontSize,
  lineHeight: "2rem",
  fontFamily: "Helvetica", //"Gill Sans",
  fontWeight: "bold",
  align: "justify-content",
  padding: "0 0 0 3px",
};

const _style_component_cell = {
  fontSize: fontSize,
  fontFamily: "Helvetica",
  borderRight: "0.25rem solid rgba(0, 0, 0, 1)",
  borderBottom: "0.25rem solid rgba(0, 0, 0, 1)",
  padding: "0 3px 0 3px",
};

const _style_component_head = {
  ...font_header,
  borderRight: "0.25rem solid rgba(0, 0, 0, 1)",
  borderBottom: "0.25rem solid rgba(0, 0, 0, 1)",
};

export const border_text_table_config = {
  muiTablePaperProps: {
    elevation: 0,
    sx: { borderRadius: "0", borderLeft: "0.25rem solid rgba(0, 0, 0, 1)" },
  },
  muiTableHeadCellProps: {
    sx: { ..._style_component_head },
  },
  muiTableBodyCellProps: { sx: { ..._style_component_cell } },
  muiTableFooterCellProps: { sx: { ..._style_component_cell } },
  muiTableContainerProps: {
    sx: {
      fontSize: fontSize,
      fontFamily: "Helvetica",
      border: "none",
      borderTop: "0.25rem solid rgba(0, 0, 0, 1)",
    },
  },
};
