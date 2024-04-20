import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetail } from '../models/my-jobs';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { UserProfileModel } from 'src/app/shared/Models/user-profile.types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient, private handleMsgService: HandleMessageService,
    private authSer: AuthService, private router: Router) { }
  private url: string = "https://job-sera-default-rtdb.firebaseio.com/";

  // currentProfileIdSub$ = new BehaviorSubject<string>('')
  createUserProfile(user: UserProfileModel) {
    let headers = this.getHeader()
    console.log(user, headers);

    return this.http.post(`${environment.fastApiMainUrl}/user-profile`, user, { headers: headers }).subscribe((res) => {
      this.handleMsgService.successMessage(
        "User profile details are successfully update",
        "Profile Updated"
      )
    })
  }


  getProfileByUserId(userId: string) {
    let headers = this.getHeader()
    console.log("user id", userId);

    return this.http.get<UserProfileModel>(`${environment.fastApiMainUrl}/user-profile/${userId}`, { headers: headers })

  }

  private getHeader() {
    let token = this.authSer.getTokenInLs()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    console.log("token", token);

    return headers
  }

  updateProfile(userDetail: UserProfileModel) {
    const profileId = userDetail.profileId;
    let headers = this.getHeader()
    return this.http.put(`${environment.fastApiMainUrl}/user-profile/${profileId}`, userDetail, { headers: headers }).subscribe((res) => {

      this.handleMsgService.successMessage(
        "User profile details are successfully update",
        "Profile Updated"
      )

      setTimeout(() => {
        this.router.navigate(['user', 'user-details'])
      }, 200)
    })
  }

  deleteProfileById(profileId: string) {
    return this.http.delete(`${environment.fastApiMainUrl}/user-profile/${profileId}`).subscribe(res => {
      console.log(res);

      this.handleMsgService.successMessage(
        "User profile id is deleted",
        "Profile Deleted"
      )
    })
  }

}
