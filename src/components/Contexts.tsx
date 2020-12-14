import { Context, createContext } from "react";
import firebase from "firebase";
import { BookingTimes } from "./Types";

export const UserContext: Context<{
  user: firebase.User;
  setUser: React.Dispatch<React.SetStateAction<firebase.User>>;
}> = createContext(null);

// export const ComplexUserContext: Context<{
//   user: {};
// }> = createContext(null);

export const NotesContext: Context<{
  addingNewNote: boolean;
  setAddingNewNote: React.Dispatch<React.SetStateAction<boolean>>;
}> = createContext(null);

export const NewBookingContext: Context<{
  bookingType: "basic" | "complex" | "birthday";

  bookingDate: Date;
  bookingTime: BookingTimes;

  numSerious: number;
  numBelayers: number;
  numClimbers: number;

  numRopes: number;

  bookingName: string;
  bookingNotes: string;

  setBookingType: React.Dispatch<
    React.SetStateAction<"basic" | "complex" | "birthday">
  >;

  setBookingDate: React.Dispatch<React.SetStateAction<Date>>;
  setBookingTime: React.Dispatch<React.SetStateAction<BookingTimes>>;

  setNumSerious: React.Dispatch<React.SetStateAction<number>>;
  setNumBelayers: React.Dispatch<React.SetStateAction<number>>;
  setNumClimbers: React.Dispatch<React.SetStateAction<number>>;

  setNumRopes: React.Dispatch<React.SetStateAction<number>>;

  setBookingName: React.Dispatch<React.SetStateAction<string>>;
  setBookingNotes: React.Dispatch<React.SetStateAction<string>>;
}> = createContext(null);
