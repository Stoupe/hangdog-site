import { customAlphabet } from "nanoid/non-secure";

export const createRandomID = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  8
);
