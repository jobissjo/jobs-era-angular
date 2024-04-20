import { Component, inject } from '@angular/core';
import { CompanyDetails } from 'src/app/shared/Models/company-details.types';
import { CompanyDetailService } from './services/company-detail.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {

  companyDetailService: CompanyDetailService= inject(CompanyDetailService);
  isSearched:boolean = false;
  details:CompanyDetails[] = [];
  ngOnInit(){
    this.details = this.companyDetailService.getDetails()
  }

  findCompanies(){
    this.isSearched = true;
  }

}
