import { HttpParams } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JobSearchService } from 'src/app/modules/home/services/job-search.service';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { CustomDialogComponent } from 'src/app/shared/components/custom-dialog/custom-dialog.component';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';

@Component({
  selector: 'app-job-openings',
  templateUrl: './job-openings.component.html',
  styleUrls: ['./job-openings.component.scss']
})
export class JobOpeningsComponent implements OnInit {
  jobPostings: JobDetails[] = []; // Populate this array with job postings data
  private jobService: JobSearchService = inject(JobSearchService);
  private authService: AuthService = inject(AuthService);
  private dialogue: MatDialog = inject(MatDialog);
  private handleMsgService: HandleMessageService = inject(HandleMessageService);
  private route: Router = inject(Router)
  ngOnInit(): void {
    this.getJobs()
  }

  getJobs() {
    let empId = this.authService.currentUserIdSub.getValue()
    this.jobService.getJobsByEmployerId(empId).subscribe({
      next: res => {
        this.jobPostings = res
      },
      error:err => {
        this.jobPostings = []
      }
    })
  }
  editJob(jobId: string) {
    // Handle editing job posting
    this.route.navigate(['employer', 'create-job'], {
      queryParams: {
        'update-job-id': jobId
      }
    })

  }
  routerToCreateJob(){
    this.route.navigate(['employer', 'create-job'])
  }

  deleteJob(jobId: string) {
    // Handle deleting job posting
    const dialog = this.dialogue.open(CustomDialogComponent, {
      width: '400px',
      enterAnimationDuration: '200px',
      exitAnimationDuration: '200px',
      data: {
        title: "Confirm to Delete",
        message: "Are you sure want to delete this job openings?"
      }
    })

    dialog.afterClosed().subscribe(res => {
      if (res) {
        console.log(res);
        this.jobService.deleteJobById(jobId).subscribe({
          next:res=> {
            console.log(res);
            this.handleMsgService.successMessage("Your job deleted successfully","Job Deleted")
            this.getJobs()
            
          },
          error:err=> {
            console.log(err);
            
          }
        })
      }
      else {
        console.log(res);

      }
    })
  }
}
