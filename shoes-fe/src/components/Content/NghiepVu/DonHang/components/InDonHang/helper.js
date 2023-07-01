export const getImageFromMAGIAY = async (MAGIAY) => {
  const response = await fetch(
    "http://localhost:8000/giay/get_HINHANH?MAGIAY=" + MAGIAY
  );
  const result = await response.json();
  console.log(MAGIAY, result);
  return result[0]["HINHANH"];
};

export const getDiaChiKhachHang = async (MAKH) => {
  const response = await fetch(
    "http://localhost:8000/khachhang/get_details?MAKH=" + MAKH
  );
  const result = await response.json();
  return result[0];
};
