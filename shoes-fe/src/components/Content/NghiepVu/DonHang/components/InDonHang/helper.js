export const getImageFromMAGIAY = async (MAGIAY) => {
  return null;
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

export const compute_total = (sub_table) => {
  let sum = 0;
  for (let i = 0; i < sub_table.length; i++) sum += sub_table[i]["TONGSO"];
  return sum;
};

export const getInfoBreakPage = (dataPrint, listImage, dictInfoPrint) => {
  let pages = [];
  let index = 0;
  let each_page = { content: [] };
  const MIN_ROW_MAGIAY_EACHPAGE = 2;
  const SIZE_PAGE_A4 = 790;
  let size_page_remain = SIZE_PAGE_A4;
  const margin_header = dictInfoPrint["margin_header"];
  const size_each_row_table = dictInfoPrint["content"]["each_row_table"];

  while (index < dataPrint.length) {
    let nof_row_visited = 0;
    let content = dataPrint[index];
    let have_image = Boolean(listImage[index]);
    let nof_row = content["TABLE"].length;

    let size_MAGIAY = dictInfoPrint["content"]["info_giay_withouimage"];
    if (have_image)
      size_MAGIAY = dictInfoPrint["content"]["info_giay_with_image"];

    let size_bottom_Table =
      size_MAGIAY +
      dictInfoPrint["content"]["header_table"] +
      dictInfoPrint["content"]["gap_in_content"];

    while (nof_row_visited <= nof_row) {
      if (size_page_remain === SIZE_PAGE_A4) {
        if (each_page["content"] && each_page["content"].length > 0) {
          pages.push({ ...each_page });
        }
        // start new page
        each_page = {};
        each_page["header"] = 1;
        size_page_remain -= dictInfoPrint["header"] + margin_header;
        each_page["content"] = [];
      }
      if (nof_row_visited === nof_row) break;
      // show content
      while (size_page_remain > 10) {
        let size_other_MAGIAY =
          size_bottom_Table + dictInfoPrint["content"]["gap_out_content"];
        let remain_for_rows = size_page_remain - size_other_MAGIAY;
        if (index === dataPrint.length - 1)
          remain_for_rows -= dictInfoPrint["footer"];

        if (remain_for_rows < 0) {
          each_page["margin_bottom"] = size_page_remain;
          size_page_remain = SIZE_PAGE_A4;
          break;
        }
        let nof_row_can_show = Math.floor(
          remain_for_rows / size_each_row_table
        );

        if (nof_row_can_show >= nof_row - nof_row_visited) {
          // show hết phần còn lại
          size_page_remain =
            size_page_remain -
            (nof_row - nof_row_visited) * size_each_row_table -
            size_other_MAGIAY;

          let sub_table = content["TABLE"].slice(nof_row_visited, nof_row);

          each_page["content"] = [
            ...each_page["content"],
            {
              MAGIAY: content["MAGIAY"],
              TENGIAY: content["TENGIAY"],
              HINHANH: listImage[index],
              Table: sub_table,
              SL: compute_total(sub_table),
            },
          ];

          each_page["margin_bottom"] = size_page_remain;
          nof_row_visited = nof_row;
          if (index === dataPrint.length - 1) {
            // kiểm tra in hết phần tử cuối cùng chưa?
            // show hết tấc cả các dòng của phần tử cuối
            // => xong nhiệm vụ
            size_page_remain = SIZE_PAGE_A4;
          }
          break;
        } else {
          // show ko hết thì phải đủ ít nhất 2 dòng
          // ko đủ 2 dòng thì cho qua new page
          if (nof_row_can_show >= MIN_ROW_MAGIAY_EACHPAGE) {
            let sub_table = content["TABLE"].slice(
              nof_row_visited,
              nof_row_visited + nof_row_can_show
            );
            each_page["content"] = [
              ...each_page["content"],
              {
                MAGIAY: content["MAGIAY"],
                TENGIAY: content["TENGIAY"],
                HINHANH: listImage[index],
                Table: sub_table,
                SL: compute_total(sub_table),
              },
            ];

            nof_row_visited += nof_row_can_show;
            size_page_remain =
              size_page_remain -
              nof_row_can_show * size_each_row_table -
              size_other_MAGIAY;
            each_page["margin_bottom"] = size_page_remain;
          } else {
            // số lượng dòng còn lại sẽ qua trang mới
            each_page["margin_bottom"] = size_page_remain;
            size_page_remain = SIZE_PAGE_A4;
            break;
          }
        }
      }
    }
    index += 1;
  }
  return pages;
};
