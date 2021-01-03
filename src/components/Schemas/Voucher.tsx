import firebase from "firebase/app";

export interface Voucher {
  voucherId: string;
  createdBy: firebase.firestore.DocumentReference;
  createdAt: firebase.firestore.Timestamp;
  activatedBy?: firebase.firestore.DocumentReference;
  activatedAt?: firebase.firestore.Timestamp;
  details: string;
  activated: boolean;
  redeemed: boolean;
  expiry: firebase.firestore.Timestamp;

  voucherDetails: EntryVoucherDetails | MonetaryVoucherDetails;
}

interface EntryVoucherDetails {
  entries: EntryVoucher[];
}

interface EntryVoucher {
  age: "adult" | "child/student";
  shoeHire: boolean;
  harnessHire: boolean;
  chalkHire: boolean;
}

interface MonetaryVoucherDetails {
  monetaryValue: number;
}
