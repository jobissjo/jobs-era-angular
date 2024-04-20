import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JobSearchService } from 'src/app/modules/home/services/job-search.service';
import { JobDetails } from 'src/app/shared/Models/job.type';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.scss']
})
export class JobApplicationsComponent {
  jobPostings: JobDetails[] = []; // Populate this array with job postings data
  private jobService: JobSearchService = inject(JobSearchService);
  private authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.getJobs()
  }

  getJobs() {
    let empId = this.authService.currentUserIdSub.getValue()
    this.jobService.getJobsByEmployerId(empId).subscribe({
      next: res => {
        this.jobPostings = res
        console.log("from job-applications", res, this.jobPostings);
        
      },
      error:err => {
        this.jobPostings = []
      }
    })
  }
}
