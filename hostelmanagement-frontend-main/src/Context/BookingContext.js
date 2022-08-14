import React from "react";
import moment from "moment";
export const BookingContext = React.createContext();

const today = moment().format("YYYY-MM-DD");

const nextDay = moment().add(1, "d").format("YYYY-MM-DD");

export const initialBookingState = {
  bookingTime: moment().format(),
  checkInTime: today,
  checkOutTime: nextDay,
  minCheckOutTime: today,
  people: 1,
  note: "",
  status: true,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CHECKIN":
      return {
        ...state,
        checkInTime: action.value,
        checkOutTime: moment(action.value).add(1, "d").format("YYYY-MM-DD"),
      };
    case "ADD_CHECKOUT":
      return { ...state, checkOutTime: action.value };
    case "ADD_MIN_CHECKOUT":
      return { ...state, minCheckOutTime: action.value };
    case "ADD_PEOPLE":
      return { ...state, people: action.value };
    case "ADD_ROOM_QUANTITY":
      return { ...state, quantity: action.value };
    case "ADD_NOTE":
      return { ...state, note: action.value };
    default:
      return state;
  }
};
