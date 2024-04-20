import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { JobApplicationService } from 'src/app/shared/service/job-application.service';
import { UtilsService } from 'src/app/shared/service/utils.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements AfterViewInit {
  @Input() jobPostings: JobDetails[] = [];
  constructor(private utilService: UtilsService,
    private router: Router,
    private jobApplicationService: JobApplicationService
  ) { }
  ngAfterViewInit(): void {
    console.log("length", this.jobPostings.length);


    if (this.jobPostings.length) {
      this.jobApplicationService.getJobApplicationByJobId(this.jobPostings[0].id)
    }
  }

  onSelectJobPosting(jobId: string) {
    this.jobApplicationService.getJobApplicationByJobId(jobId)
  }

  routeToCreateJob() {
    this.router.navigate(['employer', 'create-job'])
  }
}
