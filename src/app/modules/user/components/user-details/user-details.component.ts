import { Component } from '@angular/core';
import { UserDetail } from '../../models/my-jobs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from '../../service/user-profile.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import * as moment from 'moment';
import { UserProfileModel } from 'src/app/shared/Models/user-profile.types';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  userDetails!: UserProfileModel;

  sectionToFocus: string = '';
  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private userProfileService:UserProfileService, private authService:AuthService) { }
  ngOnInit() {
    // this.userProfileService.getProfileByUserId(this.authService.currentUserIdSub.getValue()).subscribe(res=> {
    //   if(res){
    //     this.userDetails = res;
    //   }
    // })
   this.userProfileService.getProfileByUserId(this.authService.currentUserIdSub.getValue()).subscribe(res => {
    this.userDetails = res;
   })
    this.sectionToFocus = this.activeRoute.snapshot.queryParams['section'];

    setTimeout(() => {
      this.sectionToFocus && this.focusOnSection(this.sectionToFocus);
    }, 50)
  }

  formateMomentDate(momentDate: moment.Moment):string{
    return momentDate.format('MM/YYYY')
  }

  focusOnSection(sectionId: string) {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onEditDetail(section: string) {

    this.router.navigate(['user', 'edit-profile'], { queryParams: { 'section': section } })
  }

  gotoEditProfile(){
    this.router.navigate(['user','edit-profile'])
  }
}
