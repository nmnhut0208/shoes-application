export const getImageOfDanhMuc = async (danhmuc, MA, key) => {
  const response = await fetch(
    `http://localhost:8000/${danhmuc}/get_HINHANH?${key}=${MA}`
  );
  const result = await response.json();

  try {
    return result[0]["HINHANH"];
  } catch (error) {
    return "";
  }
};
