import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { EmployerProfile } from 'src/app/shared/Models/employer.types';
import { EmployerService } from '../../services/employer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employer',
  templateUrl: './update-employer.component.html',
  styleUrls: ['./update-employer.component.scss']
})
export class UpdateEmployerComponent {

  employerForm!: FormGroup;
  updateMode: boolean = true;
  updateEmployerForm(form:EmployerProfile){
    this.employerForm.patchValue(form)
  }
  @ViewChild('tabGroup') tabGroup !:MatTabGroup;
  constructor(private fb:FormBuilder, private authService:AuthService, private employerService:EmployerService,
    private activeRoute:ActivatedRoute,private route:Router
  ){
    
  }
  personalInformation!: FormGroup;
  companyInformation!: FormGroup;
  additionalInformation!: FormGroup;
  profileId:string = '';
  ngOnInit(){
    this.employerForm = this.fb.group({
      personalInformation: this.fb.group({
        firstName: ['',[Validators.required]],
        lastName: [''],
        username: ['', [Validators.required]],
        email: ['', [Validators.email]],
        phoneNumber: ['',[Validators.required]],
        position: [''],
        socialMediaLink: [''],
        gender:['']
  
      }),
      companyInformation: this.fb.group({
        companyName: [''],
        industry: [''],
        companySize: [''],
        businessType: [''],
        companyPhoneNumber: [''],
        companyWebsite: [''],
        socialMediaLink: [''],
        desc: [''],
        address: this.fb.group({
          street: [''],
          city: [''],
          landmark:[''],
          state: [''],
          country: [''],
          postalCode: ['']
        })
  
      }),
      additionalInformation: this.fb.group({
        hearAboutUs:[''],
        agreedToTerms: ['']
      }),
    });
    this.personalInformation = <FormGroup>this.employerForm.get('personalInformation');
    this.companyInformation = <FormGroup>this.employerForm.get('companyInformation');
    this.additionalInformation = <FormGroup>this.employerForm.get('additionalInformation');

    this.authService.isEmployerLoggedIn() && this.employerService.getEmployerById(this.authService.currentUserIdSub.getValue()).subscribe({
      next: res => { 
         
        console.log("update mode");
        this.activeRoute.queryParamMap.subscribe(query_res=> {
          this.profileId = query_res.get('profile_id') ?? '';
          if(this.profileId){
            console.log("hello i am finally here", res);
            this.updateMode = true;
            this.updateEmployerForm(res)
          }else{
            this.route.navigate(['employer','profile'])
          }
        })
        
      },
      error: err => {
        this.updateMode = false;
      }
    })
  }


  goToNextTab(tabLabel:string){
    const tabIndex = this.getTabIndexByLabel(tabLabel);
    const nextTabIndex = tabIndex + 1;
    this.tabGroup.selectedIndex = nextTabIndex;
  }

  goToPrevTab(tabLabel:string){
    const prevTabIndex = this.getTabIndexByLabel(tabLabel) - 1;
    this.tabGroup.selectedIndex = prevTabIndex;
  }
  
  private getTabIndexByLabel(tabLabel: string): number {
    const tabs = this.tabGroup._tabs.toArray();
    return tabs.findIndex((tab) => tab.textLabel === tabLabel);
  }

  onFormSubmit(){
    if(this.employerForm.valid){
      console.log(this.employerForm.value);
      
      const data:EmployerProfile= {...this.employerForm.value, employer_id:this.profileId};
      this.employerService.updateEmployer(this.profileId, data)
    }
    
    
  }
}
