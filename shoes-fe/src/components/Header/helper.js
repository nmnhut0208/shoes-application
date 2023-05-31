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
        return { label: ob.TENMAU, value: ob.MAMAU };
      });
      dispatchItem(
        actions_items_context.setInfoMau([
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
