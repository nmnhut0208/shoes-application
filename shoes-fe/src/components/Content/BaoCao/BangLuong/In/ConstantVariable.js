import { rem_to_px } from "~config/ui";

export const LIST_COLS_FOOTER_SUM = ["SOLUONG", "THANHTIEN"];

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
  {
    header: "Mã giày",
    key: "MAGIAY",
    width: 30 * rem_to_px,
    textAlign: "left",
  },
  {
    header: "SL",
    key: "SOLUONG",
    width: 7 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Đơn giá",
    key: "DONGIA",
    width: 8 * rem_to_px,
    textAlign: "right",
    muiTableBodyCellProps: {
      align: "right",
    },
  },
  {
    header: "Thành tiền",
    key: "THANHTIEN",
    width: 11 * rem_to_px,
    textAlign: "right",
  },
  {
    header: "Mã quai",
    key: "MAQUAI",
    width: 8 * rem_to_px,
    textAlign: "left",
  },
  {
    header: "Mã đế",
    key: "MADE",
    width: 8 * rem_to_px,
  },
  {
    header: "Phiếu PC",
    key: "PHIEUPC",
    width: 15 * rem_to_px,
  },
  {
    header: "Diễn giải",
    key: "DIENGIAIPHIEU",
    width: 16.5 * rem_to_px,
  },
];

//=========================================================
export const dictInfoPrint = {
  header: 100,
  footer: 20,
  content: {
    gap_out_content: 10,
    header_table: 36,
    each_row_table: 57,
  },
};

//===========================================================

export const INFO_TABLE_FOOTER = [
  {
    header: "Đơn giá",
    key: "DONGIA",
    width: 10 * rem_to_px,
    textAlign: "right",
  },

  {
    header: "SL",
    key: "SOLUONG",
    width: 15 * rem_to_px,
    textAlign: "right",
  },
];
