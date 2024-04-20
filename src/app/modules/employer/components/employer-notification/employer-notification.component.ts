import { Component } from '@angular/core';
import { ResponseNotification } from 'src/app/shared/Models/user-notification.types';

@Component({
  selector: 'app-employer-notification',
  templateUrl: './employer-notification.component.html',
  styleUrls: ['./employer-notification.component.scss']
})
export class EmployerNotificationComponent {
  notifications: ResponseNotification[] = [];
  userId:string = '';
  usefulSelected:string[] = []
}
