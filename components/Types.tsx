import firebase from "firebase/app";

export interface BookingType {
  id: number;
  createdAt: firebase.firestore.Timestamp;
  bookingDate: firebase.firestore.Timestamp;
  bookingName: string;
  bookingNotes?: string;
  bookingTime: string; //TODO time?
  createdBy: string;
  numSerious: number;
  numBelayers: number;
  numClimbing: number;
  numRopes: number;
  totalNumInGym: number;
}
