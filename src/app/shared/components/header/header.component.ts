import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserNotificationService } from '../../service/user-notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLogin:boolean = false;
  isEmployerLogin:boolean = false;
  notificationCount:number = 0;
  @ViewChild('mainTitle') mainTitle!:ElementRef<HTMLSpanElement>
  constructor(private router:Router, private authService:AuthService,
    private notifyService:UserNotificationService
  ){}

  ngOnInit(){
    this.authService.userSubFA$.subscribe({
      next: res => {
        if (res.active){
          console.log("i am here");
          if(res.role == 'employer'){
            this.isEmployerLogin = true;
          }
          else{
            this.isLogin = true;
          }
          
        }
        else{
          console.log("i am not authenticated");
          this.isLogin = false;
          this.isEmployerLogin = false;
        }
      }
    })

    this.notifyService.notificationCountSub.subscribe({
      next:res =>{
        
        this.notificationCount = res
      }
    })
  }
  routeToAuth(){
    this.router.navigate(['auth'])
  }

  routeToCompany(){
    this.router.navigate(['company'])
  }
  routeToHome(){
    this.router.navigate([''])
  }
  routeToJobs(){
    this.router.navigate(['jobs'])
  }
  routeToEmployer(){
    this.router.navigate(['employer'])
  }
  routeToNotification(){
    this.router.navigate(['user', 'notifications'])
  }

  changeCursor(): void {
    this.mainTitle?.nativeElement.classList.add('hand-pointer');
  }

  resetCursor(): void {
    this.mainTitle?.nativeElement.classList.remove('hand-pointer');
  }
  routeToEmployerProfile(){
    this.router.navigate(['employer', 'profile'])
  }

  clickToUser():void{
    this.router.navigate(['user'])
  }
  onClickLogout(){
    this.authService.signOutInFA()
  }
}
