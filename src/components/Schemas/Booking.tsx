import firebase from "firebase/app";

export interface Booking {
  bookingType: "basic" | "complex" | "birthday";
  bookingName: string;
  bookingDate: Date;
  bookingNotes: string;
  bookingTime: string;
  createdAt: firebase.firestore.Timestamp;
  createdBy: string;
  numSerious: number;
  numBelayers: number;
  numClimbers: number;
  numRopes: number;
  totalNumInGym: number;
}
