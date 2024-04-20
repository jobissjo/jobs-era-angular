import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { JobApplication, JobApplicationAns, JobDetails, ResponseJobApplication } from '../Models/job.type';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  jobApplicantSub$ = new Subject<JobApplication>()
  selectedJobApplicants$ = new Subject<ResponseJobApplication[]>()
  constructor(private authService: AuthService) { }

  onSubmitAnswer(jobAns: JobApplicationAns, jobs: JobDetails) {
    let user = this.authService.userSubFA$.getValue();
    
    const jobApplication: JobApplication = {
      ...jobAns,
      name: user.username,
      email: user.email,
      location: '',
      phoneNumber: '0987654321',
      jobId: jobs.id,
      userId:user.id,
      role:jobs.jobTitle,
      company:jobs.company,
      status: 'Applied'
    }
    console.log("Type", typeof jobApplication.ableToCommute);
    
    setTimeout(() => {

      this.jobApplicantSub$.next(jobApplication);

      console.log(jobApplication);
    },200)

  }

  onSelectedJobApplicants(jobApplications:ResponseJobApplication[]){
    this.selectedJobApplicants$.next(jobApplications)
  }
}
