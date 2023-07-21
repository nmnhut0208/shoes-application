const font_size_html = 62.5;
const font_size_default_rem = 16;
export const rem_to_px = (font_size_html * font_size_default_rem) / 100;

// for Table
export const _style_component_table = {
  fontSize: "1.4rem",
  lineHeight: "2.1rem",
  fontFamily: "Arial",
  borderRight: "0.15rem solid rgba(0, 0, 0, 0.25)",
  borderBottom: "0.15rem solid rgba(0, 0, 0, 0.25)",
  padding: "8px",
};

export const border_text_table_config = {
  muiTablePaperProps: { sx: { ..._style_component_table } },
  muiTableHeadCellProps: {
    sx: { ..._style_component_table, fontSize: "1.5rem", lineHeight: "2rem" },
  },
  muiTableBodyCellProps: { minSize: 12, sx: { ..._style_component_table } },
  muiTableFooterCellProps: { sx: { ..._style_component_table } },
  muiTableContainerProps: {
    sx: {
      border: "none",
      borderTop: "0.15rem solid rgba(0, 0, 0, 0.25)",
    },
  },
};
