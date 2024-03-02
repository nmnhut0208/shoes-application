export const checkMaDanhMucExisted = (MaDanhMuc, DataInfo, KeyDanhMuc) => {
  let query = DataInfo.filter((data) => data[KeyDanhMuc] == MaDanhMuc);
  return query.length > 0;
};
