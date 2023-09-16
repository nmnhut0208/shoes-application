import { actions as actions_items_context } from "~items_context";
import {
  specialCharString,
  nof_length_value,
  between_charactor,
} from "~config/mau";

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
          { label: "", value: "" },
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
          { label: "", value: "" },
          ...listOptional,
        ])
      );
    })
    .catch((err) => {
      console.log(":error: ", err);
    });
};

export const getListQuai = (dispatchItem) => {
  console.log("get quai API ne");
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
  console.log("get mau API ne");
  fetch("http://localhost:8000/mau")
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      let listOptional = info.map(function (ob) {
        // let len = nof_length_value - ob.MAMAU.length;
        // console.log(
        //   "len: ",
        //   ob.MAMAU + specialCharString.repeat(len) + " - " + ob.TENMAU
        // );
        // if (len <= 0) len = 1;
        return {
          // label: ob.MAMAU + between_charactor + ob.TENMAU,
          label: ob.TENMAU,
          value: ob.MAMAU,
        };
      });

      dispatchItem(
        actions_items_context.setInfoMau([
          // { label: "", value: "", firstLetter: "" },
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
