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
  width: "96%",
  resize: "none",
  padding: "2px 0 2px 0",
};

const TextHeader = ({ value }) => (
  <textarea value={value} style={{ ...textarea_style }} />
);
export const list_key = [
  { header: "Mã giày", key: "MAGIAY", width: 20 * rem_to_px },
  {
    header: "Đơn giá",
    key: "DONGIA",
    width: 7 * rem_to_px,
    header_custorm: <TextHeader value={"Đơn giá"} />,
    muiTableBodyCellProps: {
      align: "right",
    },
    Cell: ({ cell }) => (
      <p>{parseFloat(cell.getValue()).toLocaleString("en")}</p>
    ),
  },
  { header: "Tên giày", key: "TENGIAY", width: 28 * rem_to_px },
  {
    header: "Mã đế",
    key: "MADE",
    width: 5 * rem_to_px,
    header_custorm: <TextHeader value={"Mã đế"} />,
  },
  // {
  //   header: "Tên đế",
  //   key: "TENDE",
  //   width: 10 * rem_to_px,
  //   header_custorm: <TextHeader value={"Tên đế"} />,
  // },
  {
    header: "Mã sườn",
    key: "MASUON",
    width: 10 * rem_to_px,
    header_custorm: <TextHeader value={"Mã sườn"} />,
  },
  // {
  //   header: "Tên sườn",
  //   key: "TENSUON",
  //   width: 12 * rem_to_px,
  //   header_custorm: <TextHeader value={"Tên sườn"} />,
  // },
  {
    header: "Mã cá",
    key: "MACA",
    width: 6 * rem_to_px,
    header_custorm: <TextHeader value={"Mã cá"} />,
  },
  // {
  //   header: "Tên cá",
  //   key: "TENCA",
  //   width: 12 * rem_to_px,
  //   header_custorm: <TextHeader value={"Tên cá"} />,
  // },
  {
    header: "Mã quai",
    key: "MAQUAI",
    width: 6 * rem_to_px,
    header_custorm: <TextHeader value={"Mã quai"} />,
  },
  // {
  //   header: "Tên quai",
  //   key: "TENQUAI",
  //   width: 12 * rem_to_px,
  //   header_custorm: <TextHeader value={"Tên quai"} />,
  // },
];
