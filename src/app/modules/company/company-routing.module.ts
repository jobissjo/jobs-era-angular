import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';

const routes: Routes = [
  { path: '', component: CompanyComponent },
 { path: 'details', component:CompanyDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
