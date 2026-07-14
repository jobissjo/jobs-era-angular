import { Injectable } from '@angular/core';
import { CreateJobDetails, JobDetails } from 'src/app/shared/Models/job.type';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { UserNotificationService } from 'src/app/shared/service/user-notification.service';
import { NotificationType } from 'src/app/shared/Models/user-notification.types';
import { Router } from '@angular/router';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
@Injectable({
  providedIn: 'root'
})
export class JobSearchService {

  jobObs$ = new BehaviorSubject<JobDetails[]>([]);
  searchResultJobs = new BehaviorSubject<JobDetails[]>([]);
  isSearching$ = new BehaviorSubject<boolean>(false);
  hasSearched$ = new BehaviorSubject<boolean>(false);
  isLoadingJobs$ = new BehaviorSubject<boolean>(false);
  selectedJobObs$ = new Subject<JobDetails>();
  constructor(private http: HttpClient, private authService: AuthService,
    private notifyService: UserNotificationService, private route: Router,
    private handleMsgService: HandleMessageService) { }



  getAllJobs() {
    this.isLoadingJobs$.next(true);
    this.http.get<JobDetails[]>(`${environment.fastApiMainUrl}/jobs/`).subscribe({
      next: res => {
        this.jobObs$.next(res);
        this.isLoadingJobs$.next(false);
      },
      error: err => {
        this.jobObs$.next([]);
        this.isLoadingJobs$.next(false);
      }
    })
  }

  createJob(data: CreateJobDetails) {
    console.log("job detail", data);

    let headers = this.getHeader();
    this.http.post<JobDetails>(`${environment.fastApiMainUrl}/jobs/`, data, { headers: headers }).subscribe({
      next: res => {
        console.log(res);
        let notification: NotificationType = {
          notificationType: 'job-invitation',
          title: "Job Invitation?",
          message: 'You are invited to apply for this page? check this out?',
          jobId: res.id,
          position: res.jobTitle,
          companyName: res.company,
          deleteOrResponded: [],
          userId: ''
        }
        this.handleMsgService.successMessage("job created successfully", "Job Created")
        this.notifyService.createUserNotification(notification);
        this.route.navigate(['employer', 'job-openings'])
      }
    })
  }

  searchJobs(searchQuery: string, location: string) {
    this.isSearching$.next(true);
    this.hasSearched$.next(true);

    let params = new HttpParams()
    if (searchQuery) {
      params = params.append('search_query', searchQuery);
    }
    if (location) {
      params = params.append('location', location);
    }

    this.http.get<JobDetails[]>(`${environment.fastApiMainUrl}/jobs/search-result/`, {params:params}).subscribe({
      next:res=>{
        this.searchResultJobs.next(res);
        this.isSearching$.next(false);
      },
      error:_err=> {
        this.searchResultJobs.next([]);
        this.isSearching$.next(false);
      },
    })
  }

  updateJob(jobId: string, data: CreateJobDetails) {
    console.log("job detail", data);

    let headers = this.getHeader();
    return this.http.put(`${environment.fastApiMainUrl}/jobs/${jobId}`, data, { headers: headers })
  }

  deleteJobById(jobId: string) {
    let headers = this.getHeader();
    return this.http.delete(`${environment.fastApiMainUrl}/jobs/${jobId}`, { headers: headers })
  }

  getJobsById(id: string) {

    let headers = this.getHeader();
    return this.http.get<JobDetails>(`${environment.fastApiMainUrl}/jobs/${id}`, { headers: headers })
  }

  getJobsByEmployerId(employerId: string) {
    let headers = this.getHeader();
    return this.http.get<JobDetails[]>(`${environment.fastApiMainUrl}/jobs/employer/${employerId}`, { headers: headers })
  }

  onClickedJob() {

  }

  onSelectedJob(jobDetails: JobDetails) {
    this.selectedJobObs$.next(jobDetails);
  }

  private getHeader() {
    let token = this.authService.getTokenInLs()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return headers
  }
}
