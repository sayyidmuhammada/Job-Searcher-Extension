export type JobsResult = {
  jobTitle: string;
  companyName: string;
  companyLocation: string;
  salaryInfo: string[];
  snippet: string;
  jobId: string | null;
  detailLink: string;
}[];
