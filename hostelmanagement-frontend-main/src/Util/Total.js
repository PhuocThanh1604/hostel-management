import moment from "moment";

export const thisMoment = moment().format("YYYY-MM-DD HH:mm");
console.log("dssdsyyy", thisMoment)

export const checkOutSurcharge = (roomCatePrice, checkOutDate) => {
  let lastTotal;
  /* 12h30PM <= check out hours <= 15PM*/
  if (
    moment(thisMoment).isSameOrAfter(`${checkOutDate} 12:30`) &&
    moment(thisMoment).isSameOrBefore(`${checkOutDate} 15:00`)
  ) {
    lastTotal = {
      surcharge: roomCatePrice * (30 / 100),
      percent: 30,
    };
  } else if (
    /*	15PM < check out hours <= 18PM */
    moment(thisMoment).isAfter(`${checkOutDate} 15:00`) &&
    moment(thisMoment).isSameOrBefore(`${checkOutDate} 18:00`)
  ) {
    lastTotal = {
      surcharge: roomCatePrice * (50 / 100),
      percent: 50,
    };
  } else if (
    /* check out hours > 18 PM*/
    moment(thisMoment).isAfter(`${checkOutDate} 18:00`)
  ) {
    lastTotal = { surcharge: roomCatePrice, percent: 100 };
  } else {
    lastTotal = { surcharge: 0, percent: 0 };
  }

  return lastTotal;
};

export const checkInSurcharge = (roomCatePrice, checkInDate) => {
  let lastTotal;
  /* 5AM < check in hours <= 9PM  */
  if (
    moment(thisMoment).isAfter(`${checkInDate} 05:00`) &&
    moment(thisMoment).isSameOrBefore(`${checkInDate} 09:00`)
  ) {
    lastTotal = {
      surcharge: roomCatePrice * (50 / 100),
      percent: 50,
    };
  } else if (
    /*	9AM < check in hours <= 11h30 */
    moment(thisMoment).isAfter(`${checkInDate} 09:00`) &&
    moment(thisMoment).isSameOrBefore(`${checkInDate} 11:30`)
  ) {
    lastTotal = {
      surcharge: roomCatePrice * (30 / 100),
      percent: 30,
    };
  } else {
    lastTotal = { surcharge: 0, percent: 0 };
  }

  return lastTotal;
};
