import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationType, ResponseNotification } from '../Models/user-notification.types';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  notificationCountSub = new BehaviorSubject<number>(0)
  notificationSub = new Subject<ResponseNotification[]>()
  notificationJobApplySub = new Subject<ResponseNotification[]>()

  get_notification_by_position(position: string) {
    let params = new HttpParams();
    params = params.append('position', position);
    let headers = this.authService.getHeader()
    return this.http.get<ResponseNotification[]>(`${environment.fastApiMainUrl}/notification/`,
      { params: params, headers: headers }).subscribe({
        next: res => {
          this.notificationSub.next(res);

        },
        error: _err => {
        }
      })
  }

  get_notification_by_userId(userId: string) {
    let headers = this.authService.getHeader()
    return this.http.get<ResponseNotification[]>(`${environment.fastApiMainUrl}/notification/users/${userId}`,
      { headers: headers }
    ).subscribe(res => {
      this.notificationJobApplySub.next(res)
    })
  }

  delete_notification_by_userId(notifyId: string, userId: string) {
    let headers = this.authService.getHeader()
    return this.http.delete<ResponseNotification[]>(`${environment.fastApiMainUrl}/notification/${notifyId}/users/${userId}`,
      { headers: headers }
    ).subscribe(res => {
      this.get_notification_by_userId(userId)
    })
  }


  createUserNotification(notification: NotificationType) {
    let headers = this.authService.getHeader()
    return this.http.post<ResponseNotification[]>(`${environment.fastApiMainUrl}/notification/`, notification, {
      headers: headers
    }).subscribe({
      next: _res => { }

    })
  }

  delete_user_notification(id: string, userId: string) {
    let params = new HttpParams();
    params = params.append('delete_user_id ', userId);
    console.log(params);
    let headers = this.authService.getHeader()
    return this.http.put<NotificationType[]>(`${environment.fastApiMainUrl}/notification/${id}/`, userId, { headers: headers })
  }
}
