export const formatDay = (day: number) => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return days[day];
};

export const formatMillitaryTime = (time: number) => {
  if (
    time.toString().length !== 4 ||
    time < 0 ||
    time > 2359 ||
    parseInt(time.toString().substring(2)) >= 60 //Last two digits of time are >=60
  ) {
    throw new Error("Incorrect number format");
  }

  const hour = parseInt(time.toString().substring(0, 2));
  const minutes = parseInt(time.toString().substring(2, 4));
  const ampm = hour < 12 ? "am" : "pm";

  if (minutes === 0) {
    return `${hour}${ampm}`
  }
  else {
    return `${hour}:${minutes}${ampm}`
  }
  
};

export const formatHour = (hour: number) => {
  const hours = [
    "12am",
    "1am",
    "2am",
    "3am",
    "4am",
    "5am",
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
  ];

  return hours[hour];
};
