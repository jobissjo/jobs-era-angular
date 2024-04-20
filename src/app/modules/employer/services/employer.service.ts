import { Injectable } from '@angular/core';
import { EmployerProfileType } from '../Models/employer.model';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyInformation, CreateEmployerProfile, EmployerProfile, ExactFastApiEmployerProfileResponse, ResponseEmployerProfile } from 'src/app/shared/Models/employer.types';
import { CreateUserModel } from 'src/app/shared/Models/auth.types';
import { map } from 'rxjs';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private authService:AuthService, private http:HttpClient,
    private handleMsgService:HandleMessageService, private router:Router
  ) { }
  private employer: EmployerProfileType = {
    personalInformation: {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      password: 'password123',
      cPassword: 'password123',
      position: 'Manager',
      socialMediaLink: 'https://example.com/johndoe',
      gender: 'male'
    },
    companyInformation: {
      companyName: 'ABC Company',
      industry: 'Software',
      companySize: 'Large',
      businessType: 'Private',
      companyPhoneNumber: '0987654321',
      companyWebsite: 'https://example.com',
      socialMediaLink: 'https://example.com/abccompany',
      desc: 'A software development company',
      address: {
        street: '123 Main St',
        city: 'New York',
        landmark: 'Near Central Park',
        state: 'NY',
        country: 'USA',
        postalCode: '10001'
      }
    },
    additionalInformation: {
      hearAboutUs: 'Friend',
      agreedToTerms: 'Yes'
    }
  }

  getEmployer(){
    return this.employer;
  }

  private splitForCreateAccEMployer(profile: CreateEmployerProfile){
    const {personalInformation, companyInformation, additionalInformation} = profile;
    // delete personalInformation.cPassword
    const {cPassword, password,...modifiedPersonalInfo} = personalInformation;
    let createUserModel:CreateUserModel = {
      username: modifiedPersonalInfo.username,
      email:modifiedPersonalInfo.email,
      role:"employer",
      active:true,
      password: password
    }

    this.authService.signUpInFA(createUserModel).subscribe({
      next:res =>{
        console.log(res);
        this.authService.signInFA(modifiedPersonalInfo.username, password)
        setTimeout(()=> {
          const newEmployerInfo:EmployerProfile = {employer_id:res.id, 
            personalInformation:modifiedPersonalInfo, 
            companyInformation, additionalInformation
          }
          this.createEmployerAcc(newEmployerInfo)
        },2000)
      },
      error:err =>{
        console.warn(err);
        
      }
    })
    
  }

  private  createEmployerAcc(profile:EmployerProfile){
    let headers = this.getHeader();
    console.log("headers", headers);
    console.log("profile", profile);
    
    
    return this.http.post(`${environment.fastApiMainUrl}/employer/`, profile, {headers:headers}).subscribe(res =>{
      console.log(res);
      this.handleMsgService.successMessage("Your employer profile created successfully😍😍","Employer Profile created")
    })
  }

  createEmployer(profile:CreateEmployerProfile){
    
    return this.splitForCreateAccEMployer(profile)
  }

  updateEmployer(profile_id:string,profile:EmployerProfile){
    let headers = this.getHeader();
    return this.http.put(`${environment.fastApiMainUrl}/employer/${profile_id}`, profile, {headers:headers}).subscribe(res=>{
      this.handleMsgService.successMessage("Your employer profile Update successfully😍😍","Employer Profile Updated")
      this.router.navigate(['employer', 'profile'])
      
    })
  }

  getEmployerById(id:string){
    let headers = this.getHeader();
    return this.http.get<ExactFastApiEmployerProfileResponse>(`${environment.fastApiMainUrl}/employer/${id}`, {headers}).pipe(map((res)=> {
      const {employer_id,personalInformation,companyInformation,additionalInformation} = res;
      const companyInfo = companyInformation[0];
      const {address, ...otherInfo} = companyInfo;
      let newCompany: CompanyInformation = {...otherInfo, address:address[0]}
      const correctedRes:EmployerProfile = {
        employer_id,
        personalInformation:personalInformation[0],
        companyInformation:newCompany,
        additionalInformation:additionalInformation[0]
      }

      return correctedRes;
    }))
  }

  private getHeader(){
    let token = this.authService.getTokenInLs()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return headers
  }

}
