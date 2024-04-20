import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/service/utils.service';
import { JobSearchService } from '../../services/job-search.service';
import { JobDetails } from 'src/app/shared/Models/job.type';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.scss']
})
export class JobApplicationComponent {
  jobDetails!:JobDetails;
  jobApplicationForm!: FormGroup;
  jobId: string = ''
  fileName: string = '';
  constructor(private fb: FormBuilder,
    private router: Router,
    private utilService: UtilsService,
    private activeRoute: ActivatedRoute,
    private jobService: JobSearchService) { }

  ngOnInit(): void {
    this.jobApplicationForm = this.fb.group({
      ableToCommute: [true, Validators.required],
      resume: [null, Validators.required],
      highQualification: ['', Validators.required],
      experience: [0, Validators.required],
      coverLetter: ['',],
      interviewDates: ['']
    });
    this.activeRoute.params.subscribe((params) => {
      this.jobId = params['id'];
      this.jobService.getJobsById(this.jobId).subscribe({
        next:res =>{
          this.jobDetails = res
          console.log("job details", res);
          
        }
      })
    })
  }
  submitJobApplication() {
    if (this.jobApplicationForm.valid && this.jobId) {
      this.router.navigate(['job-application', this.jobId, 'review']);


      this.utilService.onSubmitAnswer(this.jobApplicationForm.value, this.jobDetails)

    }

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.jobApplicationForm.patchValue({ resume: file });
    this.fileName = file ? file.name : '';
  }
}
