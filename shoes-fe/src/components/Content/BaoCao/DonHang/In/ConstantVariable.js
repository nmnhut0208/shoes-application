import { rem_to_px } from "~config/ui";
import { convertDateForReport } from "~utils/processing_date";

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
  { header: "Số ĐH", key: "SODH", width: 2.5 * rem_to_px, textAlign: "left" },
  {
    header: "Ngày ĐH",
    key: "NGAYDH",
    width: 0.5 * rem_to_px,
    Cell: ({ cell }) => convertDateForReport(cell.getValue()),
    muiTableBodyCellProps: {
      align: "right",
    },
    textAlign: "left",
  },
  {
    header: "Tên Khách Hàng",
    key: "TENKH",
    width: 3 * rem_to_px,
    textAlign: "left",
  },
  {
    header: "Tên Giày",
    key: "TENGIAY",
    width: 5 * rem_to_px,
    textAlign: "left",
  },
  {
    header: "Size0",
    key: "SIZE0",
    width: 1 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
      width: 1 * rem_to_px,
    },
    muiTableBodyCellProps: {
      align: "right",
    },
    textAlign: "right",
  },
  {
    header: "Size1",
    key: "SIZE1",
    width: 1 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    textAlign: "right",
  },
  {
    header: "Size5",
    key: "SIZE5",
    width: 1 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    textAlign: "right",
  },
  {
    header: "Size6",
    key: "SIZE6",
    width: 1 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    textAlign: "right",
  },
  {
    header: "Size7",
    key: "SIZE7",
    width: 1 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    textAlign: "right",
  },
  {
    header: "Size8",
    key: "SIZE8",
    width: 1 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    textAlign: "right",
  },
  {
    header: "Size9",
    key: "SIZE9",
    width: 1 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    textAlign: "right",
  },
  {
    header: "Số lượng",
    key: "SOLUONG",
    width: 1.2 * rem_to_px,
    header_custorm: (
      <textarea value={"Số lượng"} style={{ ...textarea_style }} />
    ),
    muiTableBodyCellProps: {
      align: "right",
    },
    textAlign: "right",
  },
  {
    header: "Đơn giá",
    key: "GIABAN",
    width: 1 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    header_custorm: (
      <textarea value={"Đơn giá"} style={{ ...textarea_style }} />
    ),
    textAlign: "right",
  },
  {
    header: "Thành tiền",
    header_custorm: (
      <textarea value={"Thành tiền"} style={{ ...textarea_style }} />
    ),
    key: "THANHTIEN",
    width: 1.5 * rem_to_px,
    muiTableBodyCellProps: {
      align: "right",
    },
    textAlign: "right",
  },
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
