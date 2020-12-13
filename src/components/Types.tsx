import firebase from "firebase/app";

export type Staff = "Henry" | "George" | "Lindsay";

export type BookingTypes = "basic" | "complex" | "birthday";

export type FirebaseBooking = {
  bookingType: BookingTypes;
  bookingName: string;
  bookingDate: string;
  bookingNotes: string;
  bookingTime: string;
  createdAt: firebase.firestore.Timestamp;
  createdBy: string;
  numSerious: number;
  numBelayers: number;
  numClimbers: number;
  numRopes: number;
  totalNumInGym: number;
};

export type FirebaseNote = {
  id: string;
  archived: boolean;
  timestamp: firebase.firestore.Timestamp;
  by: string;
  content: string;
};

export type BookingTimes =
  | string
  | "12am"
  | "1am"
  | "2am"
  | "3am"
  | "4am"
  | "5am"
  | "6am"
  | "7am"
  | "8am"
  | "9am"
  | "10am"
  | "11am"
  | "12pm"
  | "1pm"
  | "2pm"
  | "3pm"
  | "4pm"
  | "5pm"
  | "6pm"
  | "7pm"
  | "8pm"
  | "9pm"
  | "10pm"
  | "11pm";
