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
    this.searchForm = new FormGroup({
      searchQuery: new FormControl('', [Validators.required]),
      location: new FormControl('')
    })
  }

  onSearchClicked() {
    if(this.searchForm.valid) {
      this.route.navigate(['search-result'])
      const { searchQuery, location } = this.searchForm.value;
      console.log(searchQuery, location);
      this.jobService.searchJobs(searchQuery, location)
    }

  }

}
