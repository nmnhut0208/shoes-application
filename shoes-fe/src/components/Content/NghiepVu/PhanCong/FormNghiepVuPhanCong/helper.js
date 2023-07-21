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
        MAKY: "",
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
  setRowSelectionDonHangToPhanCong,
  listMaDongPhanCongAddButWaitSave,
  setListMaDongPhanCongAddButWaitSave
) => {
  if (infoPhieu["MAKY"] == "") {
    alert("Chọn kỳ tính lương.");
    return;
  }
  let list_key_form = Object.keys(formPhanCong);
  console.log("formPhanCong bi gia vay troi: ", formPhanCong);
  if (!list_key_form.includes("MAGIAY") || formPhanCong["MAGIAY"] == "") return;

  if (
    !list_key_form.includes("THODE") ||
    !list_key_form.includes("THOQUAI") ||
    formPhanCong["THODE"] == "" ||
    formPhanCong["THOQUAI"] == "" ||
    formPhanCong["THOQUAI"] == undefined ||
    formPhanCong["THODE"] == undefined
  ) {
    alert("Chọn thợ đế và thợ quai để phân công");
    return;
  }
  let remain = { ...formPhanCong };
  const record = { ...formPhanCong };
  for (let key in record) {
    if (key.includes("SIZE")) {
      if (record[key] == "") record[key] = 0;
      else record[key] = parseInt(record[key]);
    }
  }

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
      if (formPhanCong[key] == "") formPhanCong[key] = 0;
      nof_giay_phan_cong += parseInt(formPhanCong[key]);
      remain[key] =
        listGiayWillPhanCong[index][key] - parseInt(formPhanCong[key]);
      if (remain[key] > 0) is_remain = true;
    }
  }
  console.log("nof_giay_phan_cong: ", nof_giay_phan_cong);
  if (nof_giay_phan_cong > 0) {
    console.log("add ne: ", JSON.stringify({ ...record, ...infoPhieu }));
    fetch("http://localhost:8000/phancong/add_phancong", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...record, ...infoPhieu }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListMaDongPhanCongAddButWaitSave([
          ...listMaDongPhanCongAddButWaitSave,
          data["MADONG"],
        ]);
        setDataChiTietPhanCong([
          ...dataChiTietPhanCong,
          { ...record, ...data },
        ]);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }
  if (is_remain) {
    setFormPhanCong({
      ...remain,
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
        THODE: formPhanCong["THODE"],
        THOQUAI: formPhanCong["THOQUAI"],
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
  formPhanCong,
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
    console.log("idDonHang updateMaGiayWillPhanCong: ", idDonHang);
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
          console.log(
            "@@@@@@chi tiet don hang can phan cong updateMaGiayWillPhanCong: @@@@@",
            info
          );
          setListGiayWillPhanCong(info);
          console.log("formPhanCong: ", formPhanCong);
          if (info.length > 0) {
            console.log("@@@@set form phan cong nef@@@@@: ", {
              ...info[0],
              THODE: formPhanCong["THODE"],
              THOQUAI: formPhanCong["THOQUAI"],
            });
            setFormPhanCong({
              ...info[0],
              THODE: formPhanCong["THODE"],
              THOQUAI: formPhanCong["THOQUAI"],
            });
          } else {
            // resetForm();
            setFormPhanCong({
              THODE: formPhanCong["THODE"],
              THOQUAI: formPhanCong["THOQUAI"],
            });
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
  formPhanCong,
  setFormPhanCong,
  infoPhieu,
  resetForm,
  listMaDongPhanCongAddButWaitSave,
  setListMaDongPhanCongAddButWaitSave,
  dataDeleteButWaitSave,
  setDataDeleteButWaitSave
) => {
  // Kiểm tra người dùng không chọn dòng nào mà vẫn click Xóa button => return
  if (Object.keys(rowSelectionChiTietPhanCong).length == 0) return;
  if (
    parseInt(Object.keys(rowSelectionChiTietPhanCong)[0]) >=
    dataChiTietPhanCong.length
  )
    return;
  let data_delete =
    dataChiTietPhanCong[parseInt(Object.keys(rowSelectionChiTietPhanCong)[0])];
  data_delete = { ...data_delete, ...infoPhieu };

  if (!listMaDongPhanCongAddButWaitSave.includes(data_delete["MADONG"]))
    // if delete row haven't been saved => dont care
    // just consider delete row is saved database
    setDataDeleteButWaitSave([...dataDeleteButWaitSave, data_delete]);

  fetch(
    "http://localhost:8000/phancong/by_list_MADONG/?MADONG=" +
      data_delete["MADONG"],
    {
      method: "delete",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((_info) => {
      let SoDH_del = data_delete["SODH"];
      let index = parseInt(Object.keys(rowSelectionChiTietPhanCong)[0]);
      dataChiTietPhanCong.splice(index, 1);
      setDataChiTietPhanCong([...dataChiTietPhanCong]);

      let new_listMADONG = listMaDongPhanCongAddButWaitSave.filter(
        (data) => data !== data_delete["MADONG"]
      );

      console.log("new_listMADONG: ", new_listMADONG);
      setListMaDongPhanCongAddButWaitSave(new_listMADONG);

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
        setListDonHangDonePhanCong(newListDonHangDonePhanCong); // list SODH
        setDataDonHangDaPhanCong(dataDonHangDaPhanCong); // json information data donhang
        setRowSelectionDonHangToPhanCong({ 0: true });
      } else {
        updateMaGiayWillPhanCong(
          dataDonHang,
          rowSelectionDonHangToPhanCong,
          dataChiTietPhanCong,
          setListGiayWillPhanCong,
          formPhanCong,
          setFormPhanCong,
          resetForm
        );
      }
      return _info;
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
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
