import { Component } from '@angular/core';
import { EmployerService } from '../../services/employer.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { EmployerProfile } from 'src/app/shared/Models/employer.types';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss']
})
export class EmployerProfileComponent {
  employer!:EmployerProfile;
  employerId:string = '';
  constructor(private employerService:EmployerService, private authService:AuthService){

  }
  ngOnInit(){
    // this.employer = this.employerService.getEmployer()
    let employer_id = this.authService.currentUserIdSub.getValue();
    console.log(employer_id);
    this.employerId = employer_id;
    this.employerService.getEmployerById(employer_id).subscribe({
      next: res => {
        this.employer = res;
        console.log(res);
        
        
      },
      error: err => {
        console.log(err);
        
      }
    })
  }

  redirectToCreateJob(){
    
  }

  logout(){
    
  }
}
