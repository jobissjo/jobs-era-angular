import { Component } from '@angular/core';
import { JobApplication } from 'src/app/shared/Models/job.type';
import { JobApplicationService } from 'src/app/shared/service/job-application.service';
import { UtilsService } from 'src/app/shared/service/utils.service';

@Component({
  selector: 'app-review-application',
  templateUrl: './review-application.component.html',
  styleUrls: ['./review-application.component.scss']
})
export class ReviewApplicationComponent {
  jobApplication!: JobApplication;
  
  constructor(private utilsService:UtilsService, private jobApplicationSer:JobApplicationService){

  }

  ngOnInit(){
     this.utilsService.jobApplicantSub$.subscribe({
      next:res => {
        this.jobApplication = res
      },
      error:err => {
        
      }
     })
  }

  editApplicantDetails(){

  }

  editApplicationAnswers(){

  }

  submitApplication(){
    this.jobApplicationSer.createJobApplication(this.jobApplication)
  }
}
