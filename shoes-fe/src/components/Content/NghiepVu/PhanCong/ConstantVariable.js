const font_size_html = 62.5;
const font_size_default_rem = 16;
const rem_to_px = (font_size_html * font_size_default_rem) / 100;

export const list_key_DonHang = [
  { key: "STT", width: 5 * rem_to_px },
  { key: "Số đơn hàng", width: 21 * rem_to_px },
  { key: "Ngày đơn hàng", width: 16 * rem_to_px },
  { key: "Mã khách hàng", width: 16 * rem_to_px },
  { key: "Tên khách hàng", width: 25 * rem_to_px },
  { key: "Diễn dãi", width: 35 * rem_to_px },
  { key: "Tổng số lượng đặt hàng", width: 21 * rem_to_px },
];

export const list_key_ChiTietPhanCong = [
  { key: "STT", width: 5 * rem_to_px },
  { key: "Số đơn hàng", width: 15 * rem_to_px },
  { key: "Mã giày", width: 20 * rem_to_px },
  { key: "Màu đế", width: 10 * rem_to_px },
  { key: "Màu gót", width: 10 * rem_to_px },
  { key: "Màu sườn", width: 10 * rem_to_px },
  { key: "Màu cá", width: 10 * rem_to_px },
  { key: "Màu quai", width: 10 * rem_to_px },
  { key: "Thợ đế", width: 15 * rem_to_px },
  { key: "Thợ quai", width: 15 * rem_to_px },
  { key: "Size 5", width: 7 * rem_to_px },
  { key: "Size 6", width: 7 * rem_to_px },
  { key: "Size 7", width: 7 * rem_to_px },
  { key: "Size 8", width: 7 * rem_to_px },
  { key: "Size 9", width: 7 * rem_to_px },
  { key: "Size 0", width: 7 * rem_to_px },
  { key: "Tên giày", width: 15 * rem_to_px },
];

export const processingInfoTable = (list_key) => {
  const infoColumns = [];
  for (var obj in list_key) {
    const info = {
      header: list_key[obj]["key"],
      size: list_key[obj]["width"],
      accessorKey: list_key[obj]["key"],
      key: list_key[obj]["key"].toLowerCase(),
    };
    infoColumns.push(info);
  }
  return infoColumns;
};

export const renderDataEmpty = (list_key, number_rows) => {
  const data = [];
  const object_empty = {};
  for (var i = 0; i < list_key.length; i++) {
    object_empty[list_key[i]["key"]] = "";
  }
  for (var i = 0; i < number_rows; i++) {
    data.push(object_empty);
  }

  return data;
};
