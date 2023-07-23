import axios from "axios";

export const getDonGiaQuai = (MAGIAY) => {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `http://localhost:8000/giay/get_DONGIAQUAI?MAGIAY=${MAGIAY}`,
    false
  ); // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {
    return JSON.parse(request.responseText)[0]["DONGIA"];
  } else return null;
};

export const getDonGiaDe = async (MAGIAY) => {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `http://localhost:8000/giay/get_DONGIADE?MAGIAY=${MAGIAY}`,
    false
  ); // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {
    return JSON.parse(request.responseText)[0]["DONGIA"];
  } else return null;
};
