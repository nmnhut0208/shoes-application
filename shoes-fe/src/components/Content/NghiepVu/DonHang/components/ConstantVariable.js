import { rem_to_px } from "~config/ui";

const font_header = {
  fontSize: "1.5rem",
  lineHeight: "2rem",
  fontFamily: "Arial",
  fontWeight: "bold",
  padding: "2px 2px 2px 2px",
};

const textarea_style = {
  ...font_header,
  border: "none",
  width: "80%",
  resize: "none",
  padding: "2px 0 2px 0",
};

const TextHeader = ({ value }) => (
  <textarea value={value} style={{ ...textarea_style }} />
);

export const INFO_COLS_DONHANG = [
  {
    header: "Mã giày",
    key: "MAGIAY",
    width: 25 * rem_to_px,
  },
  {
    header: <TextHeader value={"Màu đế"} />,
    key: "MAUDE",
    width: 8 * rem_to_px,
  },
  {
    header: <TextHeader value={"Màu gót"} />,
    key: "MAUGOT",
    width: 8 * rem_to_px,
  },
  {
    header: <TextHeader value={"Màu sườn"} />,
    key: "MAUSUON",
    width: 8 * rem_to_px,
  },
  {
    header: <TextHeader value={"Màu cá"} />,
    key: "MAUCA",
    width: 8 * rem_to_px,
  },
  {
    header: <TextHeader value={"Màu quai"} />,
    key: "MAUQUAI",
    width: 8 * rem_to_px,
  },
  {
    // header: "Size 5",
    key: "SIZE5",
    width: 5 * rem_to_px,
    header: <TextHeader value={"Size 5"} />,
  },
  {
    header: <TextHeader value={"Size 6"} />,
    key: "SIZE6",
    width: 5 * rem_to_px,
  },
  {
    header: <TextHeader value={"Size 7"} />,
    key: "SIZE7",
    width: 5 * rem_to_px,
  },
  {
    header: <TextHeader value={"Size 8"} />,
    key: "SIZE8",
    width: 5 * rem_to_px,
  },
  {
    header: <TextHeader value={"Size 9"} />,
    key: "SIZE9",
    width: 5 * rem_to_px,
  },
  {
    header: <TextHeader value={"Size 0"} />,
    key: "SIZE0",
    width: 5 * rem_to_px,
  },
  {
    header: <TextHeader value={"Size 1"} />,
    key: "SIZE1",
    width: 5 * rem_to_px,
  },
  {
    header: <TextHeader value={"Số lượng"} />,
    key: "SOLUONG",
    width: 8 * rem_to_px,
  },
  {
    header: <TextHeader value={"Giá bán"} />,
    key: "GIABAN",
    width: 8 * rem_to_px,
  },
  {
    header: <TextHeader value={"Thành tiền"} />,
    key: "THANHTIEN",
    width: 10 * rem_to_px,
  },
  {
    header: "Diễn giải",
    key: "DIENGIAIDONG",
    width: 25 * rem_to_px,
  },
  {
    header: "In hiệu",
    key: "INHIEU",
    width: 25 * rem_to_px,
  },
  {
    header: "Tên giày",
    key: "TENGIAY",
    width: 80 * rem_to_px,
  },
];

export const COLS_HAVE_SUM_FOOTER = [
  "SIZE5",
  "SIZE6",
  "SIZE7",
  "SIZE8",
  "SIZE9",
  "SIZE0",
  "SIZE1",
  "SOLUONG",
  "THANHTIEN",
];

export const COLS_HAVE_SELECT_INPUT = [
  "MAUDE",
  "MAUGOT",
  "MAUSUON",
  "MAUCA",
  "MAUQUAI",
];
