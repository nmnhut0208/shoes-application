const font_size_html = 62.5;
const font_size_default_rem = 16;
export const rem_to_px = (font_size_html * font_size_default_rem) / 100;

// for Table
export const _style_component_table = {
  fontSize: "1.4rem",
  lineHeight: "2rem",
  fontFamily: "Arial",
  borderRight: "0.1rem solid rgba(0, 0, 0, 0.4)",
  borderBottom: "0.1rem solid rgba(0, 0, 0, 0.4)",
  padding: "4px 6px 4px 4px",
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
    // align: "center",
  },
  muiTableFooterCellProps: {
    sx: { ..._style_component_table },
  },
  muiTableContainerProps: {
    sx: {
      border: "none",
      borderTop: "0.17rem solid rgba(0, 0, 0, 0.4)",
    },
  },
};
