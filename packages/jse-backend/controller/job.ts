import jobService from "../service/job";

class JobController {
  async createJob(jobData: any) {
    try {
      const job = await jobService.createJob(jobData);
      return job;
    } catch (error) {
      console.error(error);
      return;
    }
  }
  async fetchJob() {
    try {
      const data = await jobService.fetchJob();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new JobController();
