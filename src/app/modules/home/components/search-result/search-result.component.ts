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
  isLoading = false;
  hasSearched = false;

  constructor(private jobService:JobSearchService, private route:Router){}
  onSelectedJob(job:JobDetails){
    this.route.navigate(['job-detail', job.id] )
  }
  ngOnInit(): void {
    this.jobService.isSearching$.subscribe(val => {
      this.isLoading = val;
    });
    this.jobService.hasSearched$.subscribe(val => {
      this.hasSearched = val;
    });
    this.jobService.searchResultJobs.subscribe(res=>{
      this.jobDetails = res
    })
  }
}
