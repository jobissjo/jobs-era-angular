import { Component, OnInit } from '@angular/core';
import { JobApplication, ResponseJobApplication } from 'src/app/shared/Models/job.type';
import { JobApplicationService } from 'src/app/shared/service/job-application.service';
import { UtilsService } from 'src/app/shared/service/utils.service';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.scss']
})
export class JobApplicantsComponent implements OnInit {
  jobApplicants: ResponseJobApplication[] = []

  constructor(private utilsService: UtilsService, private jobApplicationSer: JobApplicationService) { }

  ngOnInit(): void {
    this.utilsService.selectedJobApplicants$.subscribe({
      next: res => {
        this.jobApplicants = res;
      },
      error: err => {
        this.jobApplicants = []
      }
    })
  }

  getResumeByResumePath(path: string) {
    console.log(path);
    
    this.jobApplicationSer.getResume(path)
    .subscribe({
      next: (file: File) => {
        // Create a blob URL for the file
        const blobUrl = URL.createObjectURL(file);

        // Create a link element
        const link = document.createElement('a');
        link.href = blobUrl;

        // Set the filename for the download
        link.download = 'resume.pdf'; // Adjust the filename accordingly

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up
        URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);
      }, error: error => {
        console.error('Error downloading resume:', error);
        // Handle error here, such as displaying a message to the user
      }
    })

  }


}
