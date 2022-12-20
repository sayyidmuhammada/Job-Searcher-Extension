import cheerio from 'cheerio';
import { chromium, Browser, Page } from "playwright";

async function scrapeJobDetail(jobId: any) {
    const browser: Browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
  });
  const page = await context.newPage();
  await page.goto(`https://www.indeed.com/viewjob?jk=${jobId}`);

  const htmlCode = await page.evaluate(() => document.querySelector('*')!.outerHTML)

  let $ = cheerio.load(htmlCode);
  let jobType: string[] = [];
  let salaryInfo = [];

  $('#jobDetailsSection .jobsearch-JobDescriptionSection-sectionItem > div').each((_, el) => {
    if ($(el).text().trim() === 'Job Type') {
      $(el).nextAll().each((_, el) => {
        jobType.push($(el).text().trim())
      })
    }
  })
  if ($('#salaryInfoAndJobType > .icl-u-xs-mr--xs.attribute_snippet').text().trim()) {
    salaryInfo.push($('#salaryInfoAndJobType > .icl-u-xs-mr--xs.attribute_snippet').text().trim())
  }
  $('#salaryGuide > ul li').each((_, el) => {
    if (!$(el).text().trim()) return;
    salaryInfo.push($(el).text().trim().replace('..css-1nhvvuv{width:1.25rem;height:1.25rem;color:inherit;}', ''))
  })

  let result = {
    jobTitle: $('.jobsearch-JobInfoHeader-title').text().trim(),
    companyName: $('.jobsearch-InlineCompanyRating-companyHeader > a').text().trim(),
    jobType,
    salaryInfo,
    jobDescription: $("#jobDescriptionText").text().trim(),
    postDate: $(".jobsearch-HiringInsights-entry--bullet > .jobsearch-HiringInsights-entry--text").text().trim()
  };
  return result;
}

export default scrapeJobDetail;