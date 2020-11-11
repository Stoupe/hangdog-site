import { Context, createContext } from "react";
import firebase from "firebase";

export const UserContext: Context<{
  user: firebase.User;
  setUser: React.Dispatch<React.SetStateAction<firebase.User>>;
}> = createContext(null);

export const DateContext: Context<{
  bookingDate: Date;
  setBookingDate: React.Dispatch<React.SetStateAction<Date>>;
}> = createContext(null);

// export const NumSeriousContext: Context<{
//   numSerious: number;
//   setNumSerious: React.Dispatch<React.SetStateAction<number>>;
// }> = createContext(null);

export const ClimbingDetailsContext: Context<{
  // climbingDetails: {
  numSerious: number;
  numBelayers: number;
  numClimbers: number;
  numRopes: number;
  // };
  // setClimbingDetails: React.Dispatch<
  //   React.SetStateAction<{
  //     setNumSerious: number;
  //     setNumBelayers: number;
  //     setNumClimbers: number;
  //   }>
  // >;

  setNumSerious: React.Dispatch<React.SetStateAction<number>>;
  setNumBelayers: React.Dispatch<React.SetStateAction<number>>;
  setNumClimbers: React.Dispatch<React.SetStateAction<number>>;
  setNumRopes: React.Dispatch<React.SetStateAction<number>>;
}> = createContext(null);
