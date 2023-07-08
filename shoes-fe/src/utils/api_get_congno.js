export const getNoKhachHangUntilDate = async (MAKH, DATE) => {
  const response = await fetch(
    `http://localhost:8000/congno/get_congno_khachhang?MAKH=${MAKH}&DATE=${DATE}`
  );
  const result = await response.json();
  return result[0]["TONGNO"];
};
