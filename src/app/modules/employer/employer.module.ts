import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { CreateEmployerAccountComponent } from './components/create-employer-account/create-employer-account.component';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { LoginEmployerComponent } from './components/login-employer/login-employer.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { EmployerProfileComponent } from './components/employer-profile/employer-profile.component';
import { JobApplicationsComponent } from './components/job-applications/job-applications.component';
import { JobOpeningsComponent } from './components/job-openings/job-openings.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { EmployerNotificationComponent } from './components/employer-notification/employer-notification.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobApplicantsComponent } from './components/job-applicants/job-applicants.component';
import { UpdateEmployerComponent } from './components/update-employer/update-employer.component';
import { UpdatePersonalComponent } from './components/update-personal/update-personal.component';


@NgModule({
  declarations: [
    EmployerComponent,
    CreateEmployerAccountComponent,
    LoginEmployerComponent,
    PersonalInfoComponent,
    CompanyInfoComponent,
    AdditionalInfoComponent,
    CreateJobComponent,
    EmployerProfileComponent,
    JobApplicationsComponent,
    JobOpeningsComponent,
    CreateCompanyComponent,
    EmployerNotificationComponent,
    JobsComponent,
    JobApplicantsComponent,
    UpdateEmployerComponent,
    UpdatePersonalComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployerModule { }
