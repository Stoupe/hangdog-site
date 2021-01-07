import { Voucher, VoucherForm } from "../components/Schemas/Voucher";
import { useFirebase } from "./firebase";
const db = useFirebase();

export const createVoucher = async (voucher: VoucherForm): Promise<void> => {
  try {
    console.log(voucher);

    const formattedVoucher: Voucher = voucher;

    const hireDetails = {
      harnessHire: voucher.harnessHire,
      shoeHire: voucher.shoeHire,
      chalk: voucher.chalkHire,
    };

    

    const ref = db.collection("vouchers").doc(voucher.voucherId);
    const doc = await ref.get();
    if (doc.exists) {
      return Promise.reject("Voucher with this ID already exists");
    }
    await ref.set(voucher);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Checks whether a voucher exists in the database, has been activated and has not been redeemed already
 * @param voucherId
 */
export const redeemVoucher = async (voucherId: string): Promise<void> => {
  try {
    // const db = useFirebase();
    const doc = await db.collection("vouchers").doc(voucherId).get();

    if (!doc.exists) {
      return Promise.reject("Voucher doesn't exist");
    }

    const data = doc.data() as Voucher;

    if (data.redeemed) {
      return Promise.reject("Voucher has already been redeemed");
      //TODO: display voucher data if this happens, when it was redeemed etc.
    }

    if (!data.activated) {
      return Promise.reject(
        "Voucher exists but has not been activated by staff"
      );
    }

    //! TODO: Actually change redeemed property on firestore to true
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
