import { Component, OnInit, inject } from '@angular/core';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { JobSearchService } from '../../services/job-search.service';


@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit{
  jobSearchService = inject(JobSearchService);
  jobDetails:JobDetails[] = []
  ngOnInit(){
    // this.jobSearchService.fetchTasks()
    this.jobSearchService.jobObs$.subscribe((res:JobDetails[])=>{
      this.jobDetails = res
      console.log(this.jobDetails);
      if (this.jobDetails.length)
        this.onSelectedJob(this.jobDetails[0])
      
    })

    this.jobSearchService.getAllJobs()
  };

  onSelectedJob(jobDetail:JobDetails){
    this.jobSearchService.onSelectedJob(jobDetail);
  }

  
}
