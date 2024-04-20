import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateChildLogin } from './shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./modules/jobs/jobs.module').then(m => m.JobsModule),

  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'employer',
    loadChildren: () => import('./modules/employer/employer.module').then(m => m.EmployerModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./modules/company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivateChild: [canActivateChildLogin]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
