export const getNoKhachHangUntilDate = async (SOPHIEU, MAKH, DATE) => {
  const response = await fetch(
    "http://localhost:8000/congno/get_congno_khachhang?" +
      `SOPHIEU=${SOPHIEU}&MAKH=${MAKH}&DATE_TO=${DATE}`
  );
  const result = await response.json();
  return result[0]["TONGNO"];
};
