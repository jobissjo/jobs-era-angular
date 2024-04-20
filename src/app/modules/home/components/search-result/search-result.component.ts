import { Component, OnInit } from '@angular/core';
import { JobDetails } from 'src/app/shared/Models/job.type';
import { JobSearchService } from '../../services/job-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit{
  jobDetails:JobDetails[] = [];

  constructor(private jobService:JobSearchService, private route:Router){}
  onSelectedJob(job:JobDetails){
    this.route.navigate(['job-detail', job.id] )
  }
  ngOnInit(): void {
    // this.jobService
    this.jobService.searchResultJobs.subscribe(res=>{
      this.jobDetails = res
    })
  }
}
