import { Component, OnInit } from '@angular/core';
import { MatDialog,  MatDialogModule, MatDialogRef,  } from '@angular/material/dialog';
import { ResponseNotification } from 'src/app/shared/Models/user-notification.types';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserNotificationService } from 'src/app/shared/service/user-notification.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserProfileService } from '../../service/user-profile.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],

})
export class NotificationsComponent implements OnInit {


  notifications: ResponseNotification[] = [];
  

  userId: string = '';
  constructor(private dialogue: MatDialog, private _snackBar: MatSnackBar,
    private notifyService: UserNotificationService,
    private authService: AuthService,
    private userService: UserProfileService,
    private router:Router) { }
  ngOnInit(): void {
    this.userId = this.authService.currentUserIdSub.getValue();

    // job-invitation-notification
    this.notifyService.notificationSub.subscribe({
      next: res => {
        this.notifications = [...this.notifications, ...res];
        this.notifyService.notificationCountSub.next(this.notifications.length);
        this.sortTheNotification();
      }
    })

    // job-application-notification
    this.notifyService.notificationJobApplySub.subscribe({
      next: res => {
        this.notifications = [...this.notifications, ...res];
        this.notifyService.notificationCountSub.next(this.notifications.length);
        this.sortTheNotification();
      }
    })

    this.getNotification();
    this.getNotificationByUserId()
  }

  sortTheNotification(){
    this.notifications.sort((a, b) => {
      return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
    });
  }

  getNotificationByUserId(){
    this.notifyService.get_notification_by_userId(this.userId)
  }

  getNotification() {
    
    this.userService.getProfileByUserId(this.userId).subscribe({
      next: res => {
        this.notifyService.get_notification_by_position(res.personalDetail.heading)
      }
    })
  }

  routeToSendMessage(jobId:string){
    this.router.navigate(['user', 'send-message', jobId])
  }

  routeToJobDetail(jobId:string){
    console.log("jobId",jobId);
    
    this.router.navigate(['job-detail',  jobId])
  }

  daysAgoFn(date: string): number {
    let jobDate = new Date(date);
    let currentDate = new Date();

    const diffInMilliSeconds = currentDate.getTime() - jobDate.getTime();
    let msToDays: number = 1000 * 60 * 60 * 24;

    return Math.floor(diffInMilliSeconds / msToDays);
  }


  showUsefulCardFooter: boolean = true;
  usefulSelected: string[] = []

  deleteNotification(notification: ResponseNotification) {
    debugger
    let selectedNotificationId = notification.id;
    const dialogRef = this.dialogue.open(DeleteNotificationDialog, {
      width: '300px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(selectedNotificationId, this.userId);
        if (!notification.userId) {
          console.log("no user id");
          
          this.notifyService.delete_user_notification(selectedNotificationId, this.userId).subscribe({
            next: res => {
              this.getNotification()
            },
            error: err => {
              this.getNotification()
            }
          })
        }else{
          this.notifyService.delete_notification_by_userId(selectedNotificationId, this.userId)
        }

      }

    })


  }

  openSnackBar(message: string, action: string, notification: ResponseNotification) {
    this._snackBar.open(message, action);
    this.showUsefulCardFooter = false;
    this.usefulSelected.push(notification.id);
    console.log(this.usefulSelected);
  }




}

@Component({
  selector: 'delete-notification-dialog',
  templateUrl: './delete-notification-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  styles: [`.actions{
    display:'flex';
    justify-content:'space-between'
  }`]
})
export class DeleteNotificationDialog {
  constructor(public dialogRef: MatDialogRef<DeleteNotificationDialog>) { }

  noClick() {
    this.dialogRef.close(false);
  }

  okClick() {
    this.dialogRef.close(true);
  }
}