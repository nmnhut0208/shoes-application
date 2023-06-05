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
