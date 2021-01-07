import { customAlphabet } from "nanoid/non-secure";

export const createRandomID = customAlphabet(
  "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ",
  8
);
