import jobDAO from "../dao/job";

class JobService {
  createJob(jobData: any) {
    return jobDAO.createJob(jobData);
  }
  fetchJob() {
    return jobDAO.fetchJob();
  }
}

export default new JobService();
