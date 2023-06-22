import moment from "moment";

export const convertDate = (date) => {
  return moment(date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
};

export const convertDateForReport = (date) => {
  return moment(date, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY");
};
