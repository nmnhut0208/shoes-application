import { rem_to_px } from "~config/ui";

export const LIST_COLS_FOOTER_SUM = [
  "SIZE0",
  "SIZE1",
  "SIZE5",
  "SIZE6",
  "SIZE7",
  "SIZE8",
  "SIZE9",
  "SOLUONG",
  "THANHTIEN",
];

export const INFO_TABLE = [
  { header: "Số ĐH", key: "SODH", width: 1.5 * rem_to_px },
  { header: "Ngày ĐH", key: "NGAYDH", width: 1.5 * rem_to_px },
  { header: "Tên Khách Hàng", key: "TENKH", width: 3 * rem_to_px },
  { header: "Tên Giày", key: "TENGIAY", width: 2.5 * rem_to_px },
  { header: "Size0", key: "SIZE0", width: 2 * rem_to_px },
  { header: "Size1", key: "SIZE1", width: 2 * rem_to_px },
  { header: "Size5", key: "SIZE5", width: 2 * rem_to_px },
  { header: "Size6", key: "SIZE6", width: 2 * rem_to_px },
  { header: "Size7", key: "SIZE7", width: 2 * rem_to_px },
  { header: "Size8", key: "SIZE8", width: 2 * rem_to_px },
  { header: "Size9", key: "SIZE9", width: 2 * rem_to_px },
  { header: "Số lượng", key: "SOLUONG", width: 3 * rem_to_px },
  { header: "Đơn giá", key: "GIABAN", width: 3 * rem_to_px },
  { header: "Thành tiền", key: "THANHTIEN", width: 3 * rem_to_px },
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
export const fontSize = "1.4rem";

const font_header = {
  fontSize: fontSize,
  lineHeight: "1.55rem",
  fontFamily: "Times New Roman",
  fontWeight: "bold",
  align: "justify-content",
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
