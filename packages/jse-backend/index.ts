import express from 'express';
import { scrapeAllJobs, scrapeJobDetail } from 'jse-jobs-scraper';
import cors from 'cors';
import dotenv from 'dotenv';
import registerRoute from './routes/register';
import jobController from './controller/job';
import { JobsResult } from './types';

const app = express();
dotenv.config();

const RUNNING_PORT: number = !process.env.PORT ? 3001 : Number(process.env.PORT);

app.use(express.json());
app.use(cors());
app.listen(RUNNING_PORT, '0.0.0.0', () => console.log(`Running on port ${RUNNING_PORT}`));

let result: JobsResult[] = []; // this variable will contain the data that will be taken form indeed(jobs)
let jobsFromDB: JobsResult = []; // this variable similar to result this variable will contain all jobs that have been added to postgresql if the scraper running to some error
let scrapeDetailResult = {}; // this variable will contain the detail of a job

function getAllJobs() {
  try {
    jobController.fetchJob().then((res) => {
      if (!res) return;
      jobsFromDB = res;
      console.log('Successfully getting data from DB');
    });

    scrapeAllJobs(
      'https://www.indeed.com/jobs?q=Front+end+engineer&sc=0kf%3Ajt%28internship%29%3B',
      process.env.USE_DOCKER === "false" ? false : true
    ).then((res) => {
      result = res;
      jobsFromDB = res;
      console.log('Done!', res);
      pushAllJobsToDB(res);
    });
  } catch (err) {
    console.error(err);
  }
}

function pushAllJobsToDB(jobsData: JobsResult[]) {
  jobsData.forEach((jobData) => {
    jobData.forEach((job, index) => {
      jobController.createJob(job);
      console.log(`Pushing job with id ${index}`);
    });
  });
}
getAllJobs();

app.use('/register', registerRoute);

app.get('/jobsIndeed/', (req, res) => {
  res.send(result.length !== 0 ? result : jobsFromDB);
});

app.get('/jobsIndeed/detail/:jobDetailId', (req, res) => {
  console.log(req.params.jobDetailId);
  console.log('Start to scrape the job detail');
  scrapeJobDetail(req.params.jobDetailId).then((res) => {
    scrapeDetailResult = res;
    console.log('Done!');
  });
  if (Object.keys(scrapeDetailResult).length !== 0) {
    res.send(scrapeDetailResult);
  } else {
    res.send(
      `Start processing to scrape the job detail Id: ${req.params.jobDetailId}`
    );
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to Job Searcher Extension Backend');
});