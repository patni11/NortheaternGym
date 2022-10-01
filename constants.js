const fs = require("fs");
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsStr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// A function to run at Specified Time(5:00AM EST) everyday
// get the today's date, day, month, year

const gymToFile = {
  Marino2Floor: [
    "./data/MarinoCenter2Floor.json",
    "./data/moreData/MarinoCenter2Floor.csv",
  ],
  Marino3Floor: [
    "./data/MarinoCenter3FloorWeight.json",
    "./data/moreData/MarinoCenter3FloorWeight.csv",
  ],
  MarinoGymnasium: [
    "./data/MarinoCenterGym.json",
    "./data/moreData/MarinoCenterGym.csv",
  ],
  MarinoTrack: ["./data/MarinoTrack.json", "./data/moreData/MarinoTrack.csv"],
  MarinoCardio: [
    "./data/MarinoCenter3FloorCardio.json",
    "./data/moreData/MarinoCenter3FloorCardio.csv",
  ],
  SquashBusters: [
    "./data/MarinoSquashBusters.json",
    "./data/moreData/MarinoSquashBusters.csv",
  ],
};

const allGyms = [
  "Marino2Floor",
  "MarinoGymnasium",
  "Marino3Floor",
  "MarinoCardio",
  "MarinoTrack",
  "SquashBusters",
];

const Timings = {
  MarinoEndTime: "23:49",
  MarinoWeekdayStartTime: "5:30",
  MarinoWeekendStartTime: "8:00",
  SquashWeekdayStartTime: "6:00",
  SquashWeekdayEndTime: "23:49",
  SquashWeekendEndTime: "21:00",
  SquashSatStartTime: "08:00",
  SquashSunStartTime: "10:00",
};

const csvFields = [
  "Date",
  "Day",
  "Min",
  "Max",
  "0:00",
  "0:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
  "5:30",
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

const timeStringToMinutes = (timeStr, separator) =>
  timeStr.split(separator).reduce((h, m) => h * 60 + +m);

const minutesToTimeString = (minutes, separator) => {
  const minutesPart = (minutes % 60).toString().padStart(2, "0");
  const hoursPart = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  return hoursPart + separator + minutesPart;
};

const url =
  "https://connect2concepts.com/connect2/?type=circle&key=2A2BE0D8-DF10-4A48-BEDD-B3BC0CD628E7";

function roundToNearest30(time) {
  t = time.split(":");
  if (t[1] < 30) {
    return `${t[0]}:00`;
  } else {
    return `${t[0]}:30`;
  }
}

const timeOptions = {
  timeZone: "America/New_York",
  hour12: false,
  timeStyle: "short",
};

const dayOptions = {
  timeZone: "America/New_York",
  year: "numeric",
  month: "numeric",
  day: "numeric",

  weekday: "short",
};

async function createFields(file) {
  const savedDataFile = await fs.readFileSync(file);
  let gymData = JSON.parse(savedDataFile);

  for (var i = 4; i < csvFields.length; i++) {
    for (each of daysOfWeek) {
      if (!gymData[each][csvFields[i]]) {
        gymData[each][csvFields[i]] = { Average: 0, Count: 0, CurrentCount: 0 };
      }
    }
  }
  await fs.writeFileSync(file, JSON.stringify(gymData));
}

//FROM STACKOVERFLOW

function generateTimeSlots(startStr, endStr, periodInMinutes, separator = ":") {
  let startMinutes = timeStringToMinutes(startStr, separator);
  let endMinutes = timeStringToMinutes(endStr, separator);
  const oneDayInMinutes = 1440;
  if (endMinutes >= oneDayInMinutes) endMinutes = oneDayInMinutes - 1;
  if (startMinutes <= 0) startMinutes = 0;

  return Array.from(
    { length: Math.floor((endMinutes - startMinutes) / periodInMinutes) + 1 },
    (_, i) => minutesToTimeString(startMinutes + i * periodInMinutes, separator)
  );
}

module.exports = {
  daysOfWeek,
  monthsStr,
  gymToFile,
  timeStringToMinutes,
  minutesToTimeString,
  csvFields,
  url,
  dayOptions,
  timeOptions,
  Timings,
  roundToNearest30,
  allGyms,
  generateTimeSlots,
  createFields,
};
//new Date().toLocaleString("en-US",
