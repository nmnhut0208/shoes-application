export const list_key_DonHang = [
  { key: "STT", width: "7rem" },
  { key: "Số đơn hàng", width: "21rem" },
  { key: "Ngày đơn hàng", width: "10rem" },
  { key: "Mã khách hàng", width: "40rem" },
  { key: "Diễn dãi", width: "8rem" },
  { key: "Tổng số lượng đặt hàng", width: "16rem" },
];

export const list_key_ChiTietPhanCong = [
  { key: "STT", width: "7rem" },
  { key: "Số đơn hàng", width: "21rem" },
  { key: "Mã giày", width: "10rem" },
  { key: "Màu đế", width: "40rem" },
  { key: "Màu gót", width: "8rem" },
  { key: "Màu sườn", width: "8rem" },
  { key: "Màu cá", width: "8rem" },
  { key: "Màu quai", width: "8rem" },
  { key: "Thợ đế", width: "8rem" },
  { key: "Thợ quai", width: "8rem" },
  { key: "Size 5", width: "8rem" },
  { key: "Size 6", width: "8rem" },
  { key: "Size 7", width: "8rem" },
  { key: "Size 8", width: "8rem" },
  { key: "Size 9", width: "8rem" },
  { key: "Size 0", width: "8rem" },
  { key: "Tên giày", width: "16rem" },
];

export const processingInfoTable = (list_key) => {
  const infoColumns = [];
  for (var obj in list_key) {
    const info = {
      header: list_key[obj]["key"],
      width: list_key[obj]["width"],
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
