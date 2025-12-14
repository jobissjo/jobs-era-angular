import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployerService } from '../../services/employer.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-login-employer',
  templateUrl: './login-employer.component.html',
  styleUrls: ['./login-employer.component.scss']
})
export class LoginEmployerComponent {

  constructor(private fb: FormBuilder, private authSer: AuthService) { }
  loginEmployerForm!: FormGroup;
  hidePassword = true;

  ngOnInit() {
    this.loginEmployerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  login() {
    if (this.loginEmployerForm.valid) {
      const { username, password } = this.loginEmployerForm.value
      this.authSer.signInFA(username, password)
    }
  }
}
