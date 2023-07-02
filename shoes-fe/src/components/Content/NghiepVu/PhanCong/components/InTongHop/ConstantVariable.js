import { rem_to_px } from "~config/ui";

const font_header = {
  fontSize: "1.7rem",
  lineHeight: "2rem",
  fontFamily: "Helvetica", //"Gill Sans",
  fontWeight: "bold",
  align: "justify-content",
  padding: "0 0 0 3px",
};

const textarea_style = {
  ...font_header,
  border: "none",
  width: "98%",
  resize: "none",
  padding: "0 0 0 0",
};
export const INFO_COLS_THO = [
  { header: "ĐẾ", key: "TENMAUDE", width: 2.5 * rem_to_px },
  { header: "GÓT", key: "TENMAUGOT", width: 2.5 * rem_to_px },
  { header: "SƯỜN", key: "TENMAUSUON", width: 2.5 * rem_to_px },
  {
    header: "CÁ: CÁ DÀI MAY CHỈ",
    key: "TENMAUCA",
    width: 2.6 * rem_to_px,
    header_custorm: (
      <textarea value={"CÁ: CÁ DÀI MAY CHỈ"} style={{ ...textarea_style }} />
    ),
  },
  { header: "QUAI", key: "TENMAUQUAI", width: 2.5 * rem_to_px },
  { header: "SIZE", key: "SIZE", width: 3.2 * rem_to_px },
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
  { header: "THỢ ĐẾ", key: "TENTHODE", width: 2.5 * rem_to_px },
  { header: "THỢ QUAI", key: "TENTHOQUAI", width: 2.5 * rem_to_px },
  { header: "ĐƠN HÀNG", key: "SODH", width: 3.5 * rem_to_px },
];

//====================================
const _style_component_cell = {
  fontSize: "1.7rem",
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
      fontSize: "1.7rem",
      fontFamily: "Helvetica",
      border: "none",
      borderTop: "0.25rem solid rgba(0, 0, 0, 1)",
    },
  },
};
