import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { CompanySearchComponent } from './components/company-search/company-search.component';
import { PopularCompaniesComponent } from './components/popular-companies/popular-companies.component';
import { StarRatingModule } from 'angular-star-rating';


@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDetailsComponent,
    CompanySearchComponent,
    PopularCompaniesComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    AngularMaterialModule,
    StarRatingModule.forRoot()
  ]
})
export class CompanyModule { }
