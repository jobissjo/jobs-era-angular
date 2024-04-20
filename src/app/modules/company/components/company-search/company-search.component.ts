import { Component } from '@angular/core';
import { CompanyDetails } from 'src/app/shared/Models/company-details.types';
import { CompanyDetailService } from '../../services/company-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss', './../company-common.scss']
})
export class CompanySearchComponent {

  searchedCompanies!:CompanyDetails[];
  constructor(private companyDetailService:CompanyDetailService, private router:Router){

  }

  ngOnInit(){
    this.searchedCompanies = this.companyDetailService.getDetails()
  }
  onSelectedCompanyDetail(company:CompanyDetails){
    this.router.navigate(['company', 'details']);
    
    setTimeout(()=> {
      this.companyDetailService.onSelectedDetail(company)
    },50)
  }

}
