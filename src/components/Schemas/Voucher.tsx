import firebase from "firebase/app";

export type VoucherForm = {
  voucherId: string;
  createdBy: firebase.firestore.DocumentReference;
  createdAt: firebase.firestore.Timestamp;
  activatedBy?: firebase.firestore.DocumentReference;
  activatedAt?: firebase.firestore.Timestamp;
  details: string;
  activated: boolean;
  redeemed: boolean;
  expiry: firebase.firestore.Timestamp;
  age: string;
  shoeHire: boolean;
  harnessHire: boolean;
  chalkHire: boolean;
  numEntries?: number;
  monetaryValue?: number;
};

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

export interface EntryVoucherDetails {
  entries: EntryVoucher[];
}

export interface EntryVoucher {
  age: "adult" | "child/student";
  shoeHire: boolean;
  harnessHire: boolean;
  chalkHire: boolean;
}

export interface MonetaryVoucherDetails {
  monetaryValue: number;
}
