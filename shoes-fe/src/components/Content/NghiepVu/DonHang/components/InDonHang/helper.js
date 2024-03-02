export const getDiaChiKhachHang = async (MAKH) => {
  const response = await fetch(
    "http://localhost:8000/khachhang/get_details?MAKH=" + MAKH
  );
  const result = await response.json();
  return result[0];
};

export const compute_total = (sub_table) => {
  let sum = 0;
  for (let i = 0; i < sub_table.length; i++) {
    sum += parseInt(sub_table[i]["SOLUONG"]);
  }
  return sum;
};
