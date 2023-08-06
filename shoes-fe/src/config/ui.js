const font_size_html = 62.5;
const font_size_default_rem = 16;
export const rem_to_px = (font_size_html * font_size_default_rem) / 100;

// for Table
export const _style_component_table = {
  fontSize: "1.4rem",
  lineHeight: "2rem",
  fontFamily: "Arial",
  borderRight: "0.15rem solid rgba(0, 0, 0, 0.3)",
  borderBottom: "0.15rem solid rgba(0, 0, 0, 0.3)",
  padding: "12px",
};

export const border_text_table_config = {
  muiTablePaperProps: { sx: { ..._style_component_table } },
  muiTableHeadCellProps: {
    sx: {
      ..._style_component_table,
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
    align: "center",
  },
  muiTableBodyCellProps: {
    minSize: 12,
    sx: { ..._style_component_table },
    align: "center",
  },
  muiTableFooterCellProps: {
    sx: { ..._style_component_table },
  },
  muiTableContainerProps: {
    sx: {
      border: "none",
      borderTop: "0.15rem solid rgba(0, 0, 0, 0.3)",
    },
  },
};
