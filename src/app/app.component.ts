import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'job-sera';
  authService:AuthService = inject(AuthService);
  ngOnInit(): void {
    this.authService.autoLoginInFA()
  }

 
}
