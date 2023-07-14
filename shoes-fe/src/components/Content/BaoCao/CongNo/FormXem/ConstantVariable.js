import { rem_to_px } from "~config/ui";
import { convertDateForReport } from "~utils/processing_date";

export const LIST_COLS_FOOTER_SUM = ["TONGNO", "TONGMUA", "TONGTRA", "CONGNO"];

export const fontSize = "1.4rem";

const font_header = {
  fontSize: fontSize,
  lineHeight: "1.55rem",
  fontFamily: "Times New Roman",
  fontWeight: "bold",
  padding: "2px 2px 2px 2px",
};

const _style_component_cell = {
  fontSize: fontSize,
  fontFamily: "Times New Roman",
  borderRight: "0.15rem solid rgba(0, 0, 0, 1)",
  borderBottom: "0.15rem solid rgba(0, 0, 0, 1)",
  padding: "2px 2px 2px 2px",
};

const _style_component_head = {
  ...font_header,
  borderRight: "0.15rem solid rgba(0, 0, 0, 1)",
  borderBottom: "0.15rem solid rgba(0, 0, 0, 1)",
};

const textarea_style = {
  ...font_header,
  border: "none",
  width: "96%",
  resize: "none",
  padding: "2px 0 2px 0",
};

export const INFO_TABLE = [
  { header: "MÃ KHÁCH HÀNG", key: "MAKH", width: 10 * rem_to_px },
  { header: "TÊN KHÁCH HÀNG", key: "TENKH", width: 10 * rem_to_px },
  { header: "NỢ ĐẦU KỲ", key: "TONGNO", width: 10 * rem_to_px },
  { header: "TỔNG MUA", key: "TONGMUA", width: 10 * rem_to_px },
  { header: "ĐÃ TRẢ", key: "TONGTRA", width: 10 * rem_to_px },
  { header: "CÒN NỢ", key: "CONGNO", width: 10 * rem_to_px },
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
