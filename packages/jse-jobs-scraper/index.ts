import { Page, executablePath } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import scrapeJobDetail from './scrapeJobDetail';
import { AllJobsResult, result } from './types';
puppeteer.use(StealthPlugin());

let allJobsResult: AllJobsResult[] = [];
async function scrapeAllJobs(url: string): Promise<any> {
  console.log("\u2714 ", url);
  const browser = await puppeteer.launch({headless: true,
    args: [
    '--no-sandbox',
  ], executablePath: executablePath()});
  const page = await browser.newPage();
  let maxPages = 10;
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const getAllJobs = async (page : Page) => {
    return await page.evaluate(() => {
      let result: result[] = [];
      let jobsList = document.querySelectorAll('.jobsearch-ResultsList > li div.job_seen_beacon');

      jobsList.forEach((el) => {
        let salaryInfo = [];
        if (el.querySelector("div.salary-snippet-container") !== null && el.querySelector("div.estimated-salary-container") === null) {
          salaryInfo.push(el.querySelector<HTMLElement>("div.salary-snippet-container")!.innerText);
        } else if (el.querySelector("div.estimated-salary-container") !== null && el.querySelector("div.salary-snippet-container") === null) {
          salaryInfo.push(el.querySelector<HTMLElement>("div.estimated-salary-container")!.innerText);
        }
        let job = {
          jobTitle: el.querySelector<HTMLElement>('.resultContent div > h2 > a')!.innerText,
          companyName: el.querySelector<HTMLElement>('span.companyName')!.innerText,
          companyLocation: el.querySelector<HTMLElement>("div.companyLocation")!.innerText,
          postDate: el.querySelector<HTMLElement>("span.date")!.innerText,
          salaryInfo,
          snippet: el.querySelector<HTMLElement>("div.job-snippet")!.innerText,
          jobId: el.querySelector("[data-jk]")!.getAttribute("data-jk"),
          detailLink: `https//www.indeed.com/viewjob?jk=${el.querySelector("[data-jk]")!.getAttribute("data-jk")}`,
        }
        result.push(job)
      });
      return result;
    })
  }
  allJobsResult.push(await getAllJobs(page))

  if (typeof await page.$("nav[role=navigation] > div > a[aria-label='Next Page']") !== null) {
    let check = await page.$("nav[role=navigation] > div > a[aria-label='Next Page']") !== null;
    let paginationLink = check ? await page.$eval("nav[role=navigation] > div > a[aria-label='Next Page']", element => element.getAttribute("href")) : null;
    let paginationPage = paginationLink ? paginationLink.split("start=")[1].replace("start=", '') : null
    let nextUrl: string = check ? "https://www.indeed.com".concat(await page.$eval("nav[role=navigation] > div > a[aria-label='Next Page']", element => element.getAttribute("href")!)) : '';
    await browser.close();
    if (nextUrl !== null && paginationPage !== null) {
      let maxPagesNumber = maxPages * 10 - 10;
      if (Number(paginationPage) <= maxPagesNumber) {
        return await scrapeAllJobs(nextUrl);
      }
    }
  }
  return allJobsResult;
}

/*
Just for testing:
scrapeAllJobs("https://www.indeed.com/jobs?q=Front+end+engineer").then(res => console.log(res));
scrapeJobDetail("557cf744f8aa815c").then(res => console.log(res)) // the argument that i pass is the value of the job detail id
*/

export { scrapeAllJobs, scrapeJobDetail };