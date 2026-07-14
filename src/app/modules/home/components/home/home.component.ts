import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JobSearchService } from '../../services/job-search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  jobSearchService = inject(JobSearchService);
  
  isLoading = false;
  hasJobs = false;

  ngOnInit() {
    console.log("Hello this is from home component");
    
    this.jobSearchService.isLoadingJobs$.subscribe(loading => {
      this.isLoading = loading;
    });

    this.jobSearchService.jobObs$.subscribe(jobs => {
      this.hasJobs = jobs && jobs.length > 0;
    });

    this.jobSearchService.getAllJobs();
  }
}
