import moment from "moment";

export const today = moment().format("YYYY-MM-DD");
export const nextDay = moment().add(1, "days").format("YYYY-MM-DD");
export const yesterday = moment().add(-1, "days").format("MM/DD/YYYY");

export const addMoreOneDay = (minCheckOut) => {
  return moment(new moment(minCheckOut).format("YYYY-MM-DD")).add(1, "days").format("YYYY-MM-DD");
}

export const formatDateTime = (datetime) => {
  let array = datetime.split("T");
  return `${array[0]} - ${array[1]}`;
};

export const isPastTime = (date) => {
  return moment(yesterday).isAfter(date);
};

export const durationOverTime = (checkOutDate) => {
  var y = new moment(moment().format("YYYY-MM-DD HH:mm"), "YYYY-MM-DD HH:mm");
  var x = new moment(`${checkOutDate} 12:30`, "YYYY-MM-DD HH:mm");
  var duration = moment.duration(x.diff(y));
  return duration;
};

export const durationEarly = (checkInDate) => {
  var y = new moment(moment().format("YYYY-MM-DD HH:mm"), "YYYY-MM-DD HH:mm");
  var x = new moment(`${checkInDate} 11:30`, "YYYY-MM-DD HH:mm");
  var duration = moment.duration(x.diff(y));
  if (duration._milliseconds / 60000 < 0) {
    return 0;
  } else {
    return duration._milliseconds / 60000;
  }
};
