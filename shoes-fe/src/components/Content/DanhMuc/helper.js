export const checkMaDanhMucExisted = (MaDanhMuc, DataInfo, KeyDanhMuc) => {
  console.log("MaDanhMuc: ", MaDanhMuc);
  console.log("DataInfo: ", DataInfo);
  let query = DataInfo.filter((data) => data[KeyDanhMuc] == MaDanhMuc);
  console.log("query: ", query, query.length > 0);
  return query.length > 0;
};
