type UserTypes =
  | "Staff"
  | "Ongoing Member"
  | "Short Term Member"
  | "Trial Member"
  | "Guest";
type Staff = "Henry" | "Miriam" | "Ursula" | "Shaz";

export interface User {
  personalDetails: PersonalDetails;
  userType: UserTypes;

  membershipInfo?: MembershipInfo;
  tenTripInfo?: TenTripInfo;
  licenseInfo?: LicenseInfo;

  cardDetails?: {
    stripeID: string;
  };
}

interface LicenseInfo {
  belay: {
    value: boolean;
    dateGranted: Date;
  };
  lead: {
    value: boolean;
    dateGranted: Date;
  };
}

interface PersonalDetails {
  fName: { value: string; public: boolean };
  lName: { value: string; public: boolean };
  email: string;
  phone?: string;
  profilePhoto?: { value: string; public: boolean };
  emergencyContactDetails?: {
    name: string;
    email: string;
    phone?: string;
  };
  birthday?: {
    value: Date;
    public: "None" | "AgeOnly" | "DateOnly" | "FullDate";
  };
  height?: { value: number; public: boolean };
  student: {
    value: boolean;
    idPhoto?: string;
    expiry?: Date;
  };
}

interface MembershipDetails {
  length: "Ongoing" | "Fixed Term";
  level: "Big Dog" | "Little Dog" | "Fit Dog" | "Trial";
  age: "Child" | "Student" | "Adult";
  offPeak: boolean;
  frozen: boolean;
  terminated: boolean;

  startDate: Date;
  endDate: Date;
  costPM: number;
}

interface MembershipInfo {
  details: MembershipDetails;
  history: MembershipHistory[];
}

interface MembershipHistory {
  date: Date;
  by: Staff;
  message: string;

  details: MembershipDetails;

  startDate?: Date;
  endDate?: Date;
}

interface TenTripInfo {
  tripsRemaining: number;
  history: TenTripHistory[];
}

/**
 * Every time the user checks in or purchases more trips,
 * history will be added.
 */
interface TenTripHistory {
  date: Date;
  adjustment: number;
  message: string;
  by: Staff;
}
