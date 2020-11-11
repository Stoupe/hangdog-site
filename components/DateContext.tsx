import { Context, createContext } from "react";

export const DateContext:Context<{
  date: Date,
  setDate: React.Dispatch<React.SetStateAction<Date>>
}> = createContext(null);
