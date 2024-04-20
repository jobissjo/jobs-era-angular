import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobSearchService } from '../../services/job-search.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent {
  searchForm!: FormGroup;
  constructor(private jobService: JobSearchService, private authService: AuthService,
    private route: Router
  ) {

  }

  ngOnInit() {
    // debugger
    this.searchForm = new FormGroup({
      jobTitle: new FormControl('', [Validators.required]),
      location: new FormControl(''),
      experience: new FormControl('')

    })
  }

  onSearchClicked() {
    if(this.searchForm.valid) {
      console.log();
      
      this.route.navigate(['search-result'])
      const { jobTitle, location, experience } = this.searchForm.value;
      console.log(jobTitle, location, experience);
      this.jobService.searchJobs(jobTitle, location, experience)
    }

  }

}
