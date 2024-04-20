import { Component, Input } from '@angular/core';
import { CompanyDetails } from 'src/app/shared/Models/company-details.types';
import { CompanyDetailService } from '../../services/company-detail.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent {

  selectedCompany!:CompanyDetails;
  isCompanySelected:boolean = false;
  constructor(private companyDetailService:CompanyDetailService){}
  ngOnInit(){
    this.companyDetailService.selectCompanyDetailObs$.subscribe((response:CompanyDetails)=>{
      this.selectedCompany = response;
      this.isCompanySelected = true;
      
    }) 
  }

  

}
