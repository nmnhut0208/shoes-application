import moment from "moment";

export const updateInfoPhieuPhanCong = (
  infoPhieu,
  setInfoPhieu,
  setLastestSOPHIEU
) => {
  fetch("http://localhost:8000/hethong/phancong/SOPC")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(":data: ", data);
      console.log("today: ", moment().format("YYYY-MM-DD HH:mm:ss"));
      let sophieu = data["SOPC"];
      setInfoPhieu({
        ...infoPhieu,
        DIENGIAIPHIEU: "",
        SOPHIEU: sophieu,
        NGAYPHIEU: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
      setLastestSOPHIEU(data["LastestPC"]);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const processing_button_add = (
  infoPhieu,
  formPhanCong,
  setFormPhanCong,
  resetForm,
  listGiayWillPhanCong,
  setListGiayWillPhanCong,
  dataDonHang,
  setDataDonHang,
  dataDonHangDaPhanCong,
  setDataDonHangDaPhanCong,
  dataChiTietPhanCong,
  setDataChiTietPhanCong,
  listDonHangDonePhanCong,
  setListDonHangDonePhanCong,
  rowSelectionDonHangToPhanCong,
  setRowSelectionDonHangToPhanCong
) => {
  if (formPhanCong["MAGIAY"] === "") return;
  if (formPhanCong["THODE"] === "" || formPhanCong["THOQUAI"] === "") {
    alert("Chọn thợ đế và thợ quai để phân công");
    return;
  }
  let remain = { ...formPhanCong };
  const record = { ...formPhanCong };
  console.log(
    " JSON.stringify({ ...record, ...infoPhieu }): ",
    JSON.stringify({ ...record, ...infoPhieu })
  );

  fetch("http://localhost:8000/phancong/add_phancong", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...record, ...infoPhieu }),
  })
    .then((response) => {
      console.log("response: ", response);
    })
    .catch((error) => {
      console.log("error: ", error);
    });

  // TODO: khi đoạn này có giá trị null
  // luôn luôn tìm thấy nên ko check lại index
  let index = listGiayWillPhanCong.findIndex(
    (item) =>
      item["MAGIAY"] === formPhanCong["MAGIAY"] &&
      item["MAUQUAI"] === formPhanCong["MAUQUAI"] &&
      item["MAUSUON"] === formPhanCong["MAUSUON"] &&
      item["MAUCA"] === formPhanCong["MAUCA"]
  );
  let is_remain = false;

  let nof_giay_phan_cong = 0;
  for (let key in remain) {
    if (key.includes("SIZE")) {
      nof_giay_phan_cong += parseInt(formPhanCong[key]);
      remain[key] =
        listGiayWillPhanCong[index][key] - parseInt(formPhanCong[key]);
      if (remain[key] > 0) is_remain = true;
    }
  }
  if (nof_giay_phan_cong > 0)
    setDataChiTietPhanCong([...dataChiTietPhanCong, record]);
  if (is_remain) {
    setFormPhanCong({
      ...remain,
      THODE: "",
      TENTHODE: "",
      THOQUAI: "",
      TENTHOQUAI: "",
    });
    listGiayWillPhanCong[index] = remain;
    setListGiayWillPhanCong([...listGiayWillPhanCong]);
  } else {
    // xóa thằng đã phân công xong đi
    listGiayWillPhanCong.splice(index, 1);

    if (listGiayWillPhanCong.length > 0) {
      setListGiayWillPhanCong([...listGiayWillPhanCong]);
      setFormPhanCong({
        ...listGiayWillPhanCong[0],
        THODE: "",
        TENTHODE: "",
        THOQUAI: "",
        TENTHOQUAI: "",
      });
    } else {
      // Khi phân công xong thì nhảy qua thằng tiếp theo
      // nhảy qua đơn hàng tiếp theo
      let index_del = parseInt(Object.keys(rowSelectionDonHangToPhanCong)[0]);
      let id_donhang = dataDonHang[index_del]["SODH"];
      setDataDonHangDaPhanCong([
        ...dataDonHangDaPhanCong,
        dataDonHang[index_del],
      ]);
      // cái dưới chỉ lưu ID, sẽ mắc công lấy lại data
      // => hơi cực nên mình lưu luôn nguyên record đã done phân công
      setListDonHangDonePhanCong([...listDonHangDonePhanCong, id_donhang]);
      dataDonHang.splice(index_del, 1);
      setDataDonHang([...dataDonHang]);
      if (dataDonHang.length > 0 && index_del > 0) {
        index_del -= 1;
        const _row = {};
        _row[index_del] = true;
        setRowSelectionDonHangToPhanCong(_row);
      }
      setListGiayWillPhanCong([]);
      resetForm();
    }
  }
};

//----------------------------------------------------------------
export const updateMaGiayWillPhanCong = (
  dataDonHang,
  rowSelectionDonHangToPhanCong,
  dataChiTietPhanCong,
  setListGiayWillPhanCong,
  setFormPhanCong,
  resetForm
) => {
  console.log("-================0");
  console.log("run updateMaGiayWillPhanCong: ");
  if (dataDonHang.length > 0) {
    let index = 0;
    if (Object.keys(rowSelectionDonHangToPhanCong).length > 0) {
      index = parseInt(Object.keys(rowSelectionDonHangToPhanCong)[0]);
      index = Math.min(index, dataDonHang.length - 1);
    }

    let idDonHang = dataDonHang[index]["SODH"];
    console.log("idDonHang: ", idDonHang);
    if (typeof idDonHang !== "undefined") {
      // call API voi idDonHang để lấy chi tiết đơn hàng
      // các mã giày và số lượng mà khách đã chọn
      // update lại selection box cho mã giày
      // mỗi lựa chọn sẽ là thông tin khác nhau của form
      // nhớ xử lý vụ size nữa nè
      console.log("Bat dau xu ly");
      fetch(
        "http://localhost:8000/phancong/get_chitietdonhang_dephancong?SODH=" +
          encodeURIComponent(idDonHang)
      )
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          console.log("chi tiet don hang can phan cong: ", info);
          // TODO: lọc những mã giày đã phân công
          // trừ số lượng nó đi
          // làm API giả khéo léo xíu để dễ test nè
          // Để khi user chỉnh sửa danh sách đã phân công thì
          // dễ dàng show ra những đứa chưa phân công thôi
          // let list_index_done_phan_cong = [];
          // for (let index = 0; index < info.length; index++) {
          //   // TODO: test khi có columns none khi so sánh
          //   let col = dataChiTietPhanCong.findIndex(
          //     (data) =>
          //       info[index]["SODH"] === data["SODH"] &&
          //       info[index]["MAGIAY"] === data["MAGIAY"] &&
          //       info[index]["MAUDE"] === data["MAUDE"] &&
          //       info[index]["MAUGOT"] === data["MAUGOT"] &&
          //       info[index]["MAUSUON"] === data["MAUSUON"] &&
          //       info[index]["MAUCA"] === data["MAUCA"] &&
          //       info[index]["MAUQUAI"] === data["MAUQUAI"]
          //   );
          //   if (col >= 0) {
          //     // Cập nhật lại info
          //     let nof_giay_se_phan_cong = 0;
          //     for (let key in info[index]) {
          //       if (key.includes("SIZE")) {
          //         info[index][key] =
          //           info[index][key] - dataChiTietPhanCong[col][key];
          //         nof_giay_se_phan_cong += info[index][key];
          //       }
          //     }
          //     if (nof_giay_se_phan_cong == 0) {
          //       // delete row done PhanCong
          //       list_index_done_phan_cong.push(index);
          //     }
          //   }
          // }

          // // delete index in list_index_done_phan_cong
          // let list_data_will_phancong = [];
          // for (let index = 0; index < info.length; index++) {
          //   if (!list_index_done_phan_cong.includes(index)) {
          //     list_data_will_phancong.push(info[index]);
          //   }
          // }

          let list_data_will_phancong = info;
          console.log("list_data_will_phancong: ", list_data_will_phancong);
          setListGiayWillPhanCong(list_data_will_phancong);
          if (list_data_will_phancong.length > 0) {
            setFormPhanCong({
              ...list_data_will_phancong[0],
              THODE: "",
              TENTHODE: "",
              THOQUAI: "",
              TENTHOQUAI: "",
            });
          } else {
            resetForm();
          }
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    }
  }
};

//----------------------------------------------------------------
export const processing_button_delete = (
  dataDonHang,
  setDataDonHang,
  rowSelectionDonHangToPhanCong,
  setRowSelectionDonHangToPhanCong,
  dataChiTietPhanCong,
  setDataChiTietPhanCong,
  rowSelectionChiTietPhanCong,
  dataDonHangDaPhanCong,
  setDataDonHangDaPhanCong,
  listDonHangDonePhanCong,
  setListDonHangDonePhanCong,
  setListGiayWillPhanCong,
  setFormPhanCong,
  infoPhieu,
  resetForm
) => {
  if (Object.keys(rowSelectionChiTietPhanCong).length == 0) return;
  let data_delete =
    dataChiTietPhanCong[parseInt(Object.keys(rowSelectionChiTietPhanCong)[0])];
  data_delete = { ...data_delete, ...infoPhieu };
  console.log("JSON.stringify(data_delete): ", JSON.stringify(data_delete));
  fetch("http://localhost:8000/phancong", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data_delete),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
  let SoDH_del = data_delete["SODH"];

  let index = parseInt(Object.keys(rowSelectionChiTietPhanCong)[0]);
  dataChiTietPhanCong.splice(index, 1);
  setDataChiTietPhanCong([...dataChiTietPhanCong]);

  if (listDonHangDonePhanCong.includes(SoDH_del)) {
    let newListDonHangDonePhanCong = listDonHangDonePhanCong.filter(
      (value) => value !== SoDH_del
    );
    let index_del = dataDonHangDaPhanCong.findIndex(
      (data) => data["SODH"] === SoDH_del
    );
    let record_del = dataDonHangDaPhanCong[index_del];
    dataDonHangDaPhanCong.splice(index_del, 1);
    setDataDonHang([record_del, ...dataDonHang]);
    setListDonHangDonePhanCong(newListDonHangDonePhanCong);
    setDataDonHangDaPhanCong(dataDonHangDaPhanCong);
    setRowSelectionDonHangToPhanCong({ 0: true });
  } else {
    updateMaGiayWillPhanCong(
      dataDonHang,
      rowSelectionDonHangToPhanCong,
      dataChiTietPhanCong,
      setListGiayWillPhanCong,
      setFormPhanCong,
      resetForm
    );
  }
};

export const updateSOPHIEU = (sophieu) => {
  console.log("save so don hang: ", sophieu);
  fetch("http://localhost:8000/hethong/phancong/SOPC", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ LASTNUMBER: sophieu }),
  }).catch((error) => {
    console.log("error: ", error);
  });
};

// -----------------------------------------------------------------
// export const update_status_phancongs_by_madong = (list_madong, value) => {
//   fetch(
//     "http://localhost:8000/donhang/update_status_phancong/?MADONG=" +
//       list_madong.join("&MADONG=") +
//       "&status=" +
//       value
//   )
//     .then((response) => {
//       console.log("response: ", response);
//     })
//     .catch((error) => {
//       console.log("error: ", error);
//     });
// };
