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

export const fontSize = "1.4rem";

const font_header = {
  fontSize: fontSize,
  lineHeight: "1.55rem",
  fontFamily: "Times New Roman",
  fontWeight: "bold",
  padding: "0px 0 0 3px",
};

const textarea_style = {
  ...font_header,
  border: "none",
  width: "96%",
  resize: "none",
  padding: "2px 0 2px 0",
};
export const INFO_COLS_THO = [
  { header: "ĐẾ", key: "TENMAUDE", width: 2.45 * rem_to_px },
  { header: "GÓT", key: "TENMAUGOT", width: 2.45 * rem_to_px },
  { header: "SƯỜN", key: "TENMAUSUON", width: 2.45 * rem_to_px },
  {
    header: "CÁ: CÁ DÀI MAY CHỈ",
    key: "TENMAUCA",
    width: 2.7 * rem_to_px,
    header_custorm: (
      <textarea value={"CÁ: CÁ DÀI MAY CHỈ"} style={{ ...textarea_style }} />
    ),
  },
  { header: "QUAI", key: "TENMAUQUAI", width: 2.45 * rem_to_px },
  { header: "SIZE", key: "SIZE", width: 4.8 * rem_to_px },
  {
    header: "Tổng số",
    key: "TONGSO",
    width: 1.3 * rem_to_px,
    header_custorm: (
      <textarea value={"Tổng số"} style={{ ...textarea_style }} />
    ),
    muiTableBodyCellProps: {
      align: "right",
    },
  },
  {
    header: "THỢ ĐẾ",
    key: "TENTHODE",
    width: 2 * rem_to_px,
    header_custorm: <textarea value={"THỢ ĐẾ"} style={{ ...textarea_style }} />,
  },
  {
    header: "THỢ QUAI",
    key: "TENTHOQUAI",
    width: 2 * rem_to_px,
    header_custorm: (
      <textarea value={"THỢ QUAI"} style={{ ...textarea_style }} />
    ),
  },
];

//====================================
const _style_component_cell = {
  fontSize: fontSize,
  fontFamily: "Times New Roman",
  borderRight: "0.15rem solid rgba(0, 0, 0, 1)",
  borderBottom: "0.15rem solid rgba(0, 0, 0, 1)",
  padding: "0 3px 0 1px",
};

const _style_component_head = {
  ...font_header,
  borderRight: "0.15rem solid rgba(0, 0, 0, 1)",
  borderBottom: "0.15rem solid rgba(0, 0, 0, 1)",
};

export const border_text_table_config = {
  muiTablePaperProps: {
    elevation: 0,
    sx: { borderRadius: "0", borderLeft: "0.15rem solid rgba(0, 0, 0, 1)" },
  },
  muiTableHeadCellProps: {
    sx: { ..._style_component_head },
  },
  muiTableBodyCellProps: { sx: { ..._style_component_cell } },
  muiTableFooterCellProps: { sx: { ..._style_component_cell } },
  muiTableContainerProps: {
    sx: {
      fontSize: fontSize,
      fontFamily: "Times New Roman",
      border: "none",
      borderTop: "0.15rem solid rgba(0, 0, 0, 1)",
    },
  },
};

//===============================================
export const dictInfoPrint = {
  header: 30,
  margin_header: 40,
  footer: 10, //50,
  content: {
    gap_in_content: 10,
    gap_out_content: 40,
    info_giay_withouimage: 36,
    info_giay_with_image: 161,
    header_table: 60,
    each_row_table: 60,
  },
};
