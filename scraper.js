const puppeteer = require("puppeteer");
const Tesseract = require("tesseract.js");
const fs = require("fs");
const { url } = require("./constants");

async function scrapeData(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: "example.png", fullPage: true });
  await browser.close();
  await recognizeText();
}

async function recognizeText() {
  await Tesseract.recognize("./example.png", "eng", {
    logger: (m) => {},
  }).then(({ data: { text } }) => {
    fs.writeFileSync("./siteRawData.txt", text);
  });
}

async function cleanData() {
  personCount = [];
  const data = await fs.readFileSync("./siteRawData.txt", {
    encoding: "utf8",
    flag: "r",
  });
  const values = data.split("\n");
  try {
    for (line of values) {
      if (line.includes("Last Count")) {
        for (each of line.replace(/\s+/, "").match(/(\d+)/g)) {
          personCount.push(each);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
  return personCount;
}

async function scraper() {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("scraping");
      await scrapeData(url);
      const personCount = await cleanData();
      resolve(personCount);
    } catch (e) {
      reject(e);
    }
  });
}
module.exports = { scraper };
