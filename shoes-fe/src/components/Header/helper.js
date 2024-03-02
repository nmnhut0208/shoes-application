import { actions as actions_items_context } from "~items_context";

export const getListDe = (dispatchItem) => {
  fetch("http://localhost:8000/de")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      let listOptional = info.map(function (ob) {
        return { label: ob.TENDE, value: ob.MADE };
      });
      dispatchItem(
        actions_items_context.setInfoDe([
          { label: "Không chọn đế", value: "              " },
          ...listOptional,
        ])
      );
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const getListSuon = (dispatchItem) => {
  fetch("http://localhost:8000/suon")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      let listOptional = info.map(function (ob) {
        return { label: ob.TENSUON, value: ob.MASUON };
      });
      dispatchItem(
        actions_items_context.setInfoSuon([
          { label: "", value: "" },
          ...listOptional,
        ])
      );
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const getListCa = (dispatchItem) => {
  fetch("http://localhost:8000/ca")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      let listOptional = info.map(function (ob) {
        return { label: ob.TENCA, value: ob.MACA };
      });
      dispatchItem(
        actions_items_context.setInfoCa([
          { label: "Không chọn cá", value: "            " },
          ...listOptional,
        ])
      );
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const getListQuai = (dispatchItem) => {
  fetch("http://localhost:8000/quai")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      let listOptional = info.map(function (ob) {
        return { label: ob.TENQUAI, value: ob.MAQUAI };
      });
      dispatchItem(
        actions_items_context.setInfoQuai([
          { label: "", value: "" },
          ...listOptional,
        ])
      );
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const getListMau = (dispatchItem) => {
  fetch("http://localhost:8000/mau")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      let listOptional = info.map(function (ob) {
        return {
          label: ob.TENMAU,
          value: ob.MAMAU,
        };
      });

      dispatchItem(
        actions_items_context.setInfoMau([
          { label: "Không chọn màu", value: "            " },
          ...listOptional,
        ])
      );
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const getListGot = (dispatchItem) => {
  fetch("http://localhost:8000/got")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      let listOptional = info.map(function (ob) {
        return { label: ob.TENGOT, value: ob.MAGOT };
      });
      dispatchItem(
        actions_items_context.setInfoGot([
          { label: "", value: "" },
          ...listOptional,
        ])
      );
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const getListMui = (dispatchItem) => {
  fetch("http://localhost:8000/mui")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      let listOptional = info.map(function (ob) {
        return { label: ob.TENMUI, value: ob.MAMUI };
      });
      dispatchItem(
        actions_items_context.setInfoMui([
          { label: "", value: "" },
          ...listOptional,
        ])
      );
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const getListKhachHang = (dispatchItem) => {
  fetch("http://localhost:8000/khachhang")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      dispatchItem(actions_items_context.setInfoKhachHang(info));
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const getListThoDe = (dispatchItem) => {
  fetch("http://localhost:8000/nhanvien/get-thode")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      let listOptional = info.map(function (ob) {
        return { label: ob.TENNVIEN, value: ob.MANVIEN };
      });
      dispatchItem(
        actions_items_context.setInfoThoDe([
          { label: "", value: "" },
          ...listOptional,
        ])
      );
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const getListThoQuai = (dispatchItem) => {
  fetch("http://localhost:8000/nhanvien/get-thoquai")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      let listOptional = info.map(function (ob) {
        return { label: ob.TENNVIEN, value: ob.MANVIEN };
      });
      dispatchItem(
        actions_items_context.setInfoThoQuai([
          { label: "", value: "" },
          ...listOptional,
        ])
      );
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const getListNhanVien = (dispatchItem) => {
  fetch("http://localhost:8000/chamcong/nhanvien")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      let listOptional = info.map(function (ob) {
        return { label: ob.TENNVIEN, value: ob.MANVIEN };
      });
      dispatchItem(
        actions_items_context.setInfoNhanVien([
          { label: "", value: "" },
          ...listOptional,
        ])
      );
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const getListKyTinhLuong = (dispatchItem) => {
  fetch("http://localhost:8000/kytinhluong")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      dispatchItem(actions_items_context.setInfoKyTinhLuong(info));
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};
