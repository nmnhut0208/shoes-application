const font_size_html = 62.5;
const font_size_default_rem = 16;
const rem_to_px = (font_size_html * font_size_default_rem) / 100;

export const list_key = [
  { key: "STT", width: 7 * rem_to_px, enableEditing: false },
  { key: "Mã giày", width: 21 * rem_to_px, enableEditing: false },
  { key: "Tên giày", width: 40 * rem_to_px, enableEditing: false },
  { key: "Màu đế", width: 12 * rem_to_px, enableEditing: true },
  { key: "Màu sườn", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu cá", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu quai", width: 12 * rem_to_px, enableEditing: false },
  { key: "Size 5", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 6", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 7", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 8", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 9", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 0", width: 8 * rem_to_px, enableEditing: true },
  { key: "Số lượng", width: 24 * rem_to_px, enableEditing: false },
  { key: "Giá bán", width: 24 * rem_to_px, enableEditing: false },
];

export const columns_have_sum_feature = [
  "Size 5",
  "Size 6",
  "Size 7",
  "Size 8",
  "Size 9",
  "Size 0",
  "Số lượng",
];
