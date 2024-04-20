import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
import { Role } from '../../Models/Enums';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signupForm!: FormGroup;
  isLoading: boolean = false;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router, 
    private handleMsgService:HandleMessageService) {

  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cPassword: ['', [Validators.required]]
    });
  }
  common_toast_style = {
    closeButton: true,
    positionClass: 'toast-top-center'
  }

  onFormSubmit() {
    if (this.signupForm.valid) {
      const { cPassword, ...formObj } = this.signupForm.value;
      if (formObj.password == cPassword) {
        // this.authService.signUp(email, password).subscribe({
        //   next: _res => {
        //     this.handleMsgService.successMessage("User created for " + username, "User Created")
        //     this.signupForm.reset();
        //     this.router.navigate([''])
        //   },
        //   error: err => {
        //     this.handleMsgService.errorMessage(err, "Error")
        //   }
        // })
        formObj.role = Role.USER
        formObj.active = true;
        this.authService.signUpInFA(formObj).subscribe({
          next:res => {
            this.router.navigate(['auth', 'sign-in']);
          },
          error:err => {
            console.warn(err);
            
          }
        })
        this.isLoading = true
        this.hideProgressBar();
      }
      else {
        this.handleMsgService.warningMessage("Password and Confirm Password not match", "Password Not Matched")
      }
    }
    else {
      this.handleMsgService.warningMessage(
        "Enter all details in the form", "Form Not Valid"
      )
    }

  }

  protected checkSamePassword() {
    const password = this.signupForm.value.password;
    const cPassword = this.signupForm.value.cPassword;

    return password === cPassword;
  }

  protected checkControlInValid(control: string) {
    return this.signupForm.get(control)?.touched && this.signupForm.get(control)?.invalid;
  }

  hideProgressBar() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500)
  }

}

