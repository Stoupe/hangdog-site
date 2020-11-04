// import React, { SyntheticEvent } from "react";
// import ApiCalendar from "react-google-calendar-api/src/ApiCalendar";

// const Calendar = () => {
//   function handleItemClick(event: SyntheticEvent<any>, name: string): void {
//     if (name === "sign-in") {
//       ApiCalendar.handleAuthClick();
//     } else if (name === "sign-out") {
//       ApiCalendar.handleSignoutClick();
//     }
//   }

//   const viewEvents = () => {
//     if (ApiCalendar.sign)
//       ApiCalendar.listUpcomingEvents(10).then(({ result }: any) => {
//         console.log(result.items);
//       });
//   };

//   return (
//     <div>
//       <button
//         onClick={(e) => {
//           handleItemClick(e, "sign-in");
//         }}
//       >
//         Sign in
//       </button>
//       <button
//         onClick={() => {
//           viewEvents();
//         }}
//       >
//         View Events
//       </button>
//     </div>
//   );
// };

// export default Calendar;
