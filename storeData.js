const scraper = require("./scraper");
const fs = require("fs");
const { gymToFile } = require("./constants");

async function save(gym, personCount, roundedTime, day) {
  console.log(`Saving ${gym} file`);

  return new Promise(async (resolve, reject) => {
    try {
      const savedDataFile = await fs.readFileSync(gymToFile[gym][0]);
      let gymData = JSON.parse(savedDataFile);

      const newCount = gymData[day][roundedTime]["Count"] + 1;
      const newAverage =
        (gymData[day][roundedTime]["Average"] + personCount) / 2;

      gymData[day][roundedTime]["Count"] = newCount;
      gymData[day][roundedTime]["Average"] = Math.floor(newAverage);
      gymData[day][roundedTime]["CurrentCount"] = personCount;

      personCount > gymData[day]["Max"]
        ? (gymData[day]["Max"] = personCount)
        : "";
      personCount < gymData[day]["Min"]
        ? (gymData[day]["Min"] = personCount)
        : "";

      await fs.writeFileSync(gymToFile[gym][0], JSON.stringify(gymData));
      resolve(`Saved Data for ${gym}`);
    } catch (e) {
      reject(e);
    }
  });
}

// async function savePermanently(day, gym, dateString) {
//   const savedDataFile = await fs.readFileSync(gymToFile[gym][0]);
//   let gymData = JSON.parse(savedDataFile);

//   // gymData[day][roundedTime]["CurrentCount"] = personCount;

//   var len = 0;
//   for (e of allPersonCountsToday) {
//     if (e != 0) {
//       len += 1;
//     }
//   }
//   Average = Math.floor(allPersonCountsToday.reduce((p, c) => p + c) / len);

//   arrayForCsv = [dateString, day, min, max, Average, ...allPersonCountsToday];
//   while (arrayForCsv.length < csvFields.length) {
//     arrayForCsv.push(0);
//   }
//   stringForCsv = arrayForCsv.join(",") + "\r\n";

//   await fs.appendFile(file, stringForCsv, function(err) {
//     if (err) throw err;
//     console.log('The "data to append" was appended to file!');
//   });
// }

module.exports = { save };
