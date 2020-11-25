import firebase from "firebase/app";

export interface BookingType {
  // id: string;
  createdAt: firebase.firestore.Timestamp;
  bookingDate: string; //  dd/MM/yyyy
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

export type Staff = "Henry" | "George" | "Lindsay";
