import moment from "moment";
import { CustomAlert } from "~utils/alert_custom";

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
      let sophieu = data["SOPC"];
      setInfoPhieu({
        ...infoPhieu,
        MAKY: "",
        DIENGIAIPHIEU: "",
        SOPHIEU: sophieu,
        NGAYPHIEU: moment()
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          .format("YYYY-MM-DD HH:mm:ss"),
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
  setListMaDongPhanCongAddButWaitSave,
  dataView,
  lastestSOPHIEU
) => {
  if (infoPhieu["MAKY"] == "") {
    CustomAlert("Chọn kỳ tính lương.");
    return;
  }
  let list_key_form = Object.keys(formPhanCong);
  if (!list_key_form.includes("MAGIAY") || formPhanCong["MAGIAY"] == "") return;

  if (
    !list_key_form.includes("THODE") ||
    !list_key_form.includes("THOQUAI") ||
    formPhanCong["THODE"] == "" ||
    formPhanCong["THOQUAI"] == "" ||
    formPhanCong["THOQUAI"] == undefined ||
    formPhanCong["THODE"] == undefined
  ) {
    CustomAlert("Chọn thợ đế và thợ quai để phân công");
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
  if (nof_giay_phan_cong > 0) {
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
        if (dataDonHang.length == index_del) index_del -= 1;
        const _row = {};
        _row[index_del] = true;
        setRowSelectionDonHangToPhanCong(_row);
      }
      setListGiayWillPhanCong([]);
      resetForm();
    }
  }
  if (!dataView) updateSOPHIEU(lastestSOPHIEU);
};

//----------------------------------------------------------------
export const updateMaGiayWillPhanCong = (
  dataDonHang,
  rowSelectionDonHangToPhanCong,
  setListGiayWillPhanCong,
  formPhanCong,
  setFormPhanCong
) => {
  if (dataDonHang.length > 0) {
    let index = 0;
    if (Object.keys(rowSelectionDonHangToPhanCong).length > 0) {
      index = parseInt(Object.keys(rowSelectionDonHangToPhanCong)[0]);
      index = Math.min(index, dataDonHang.length - 1);
    }

    let idDonHang = dataDonHang[index]["SODH"];
    if (typeof idDonHang !== "undefined") {
      // call API voi idDonHang để lấy chi tiết đơn hàng
      // các mã giày và số lượng mà khách đã chọn
      // update lại selection box cho mã giày
      // mỗi lựa chọn sẽ là thông tin khác nhau của form
      // nhớ xử lý vụ size nữa nè
      fetch(
        "http://localhost:8000/phancong/get_chitietdonhang_dephancong?SODH=" +
          encodeURIComponent(idDonHang)
      )
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          setListGiayWillPhanCong(info);
          if (info.length > 0) {
            setFormPhanCong({
              ...info[0],
              THODE: formPhanCong["THODE"],
              THOQUAI: formPhanCong["THOQUAI"],
            });
          } else {
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
          setListGiayWillPhanCong,
          formPhanCong,
          setFormPhanCong
        );
      }
      return _info;
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const updateSOPHIEU = (sophieu) => {
  fetch("http://localhost:8000/hethong/phancong/SOPC", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ LASTNUMBER: sophieu }),
  }).catch((error) => {
    console.log("error: ", error);
  });
};
