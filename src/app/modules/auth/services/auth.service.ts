import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthResponse, } from '../Models/authResponse.model';
import { UserFireResponse } from '../Models/userFireResponse.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
import { CreateUserModel, ResponseUserModel, TokenResponse } from 'src/app/shared/Models/auth.types';
import { Role } from '../Models/Enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private handleMsgService: HandleMessageService) { }

  userFA: ResponseUserModel = { id: '', username: '', email: '', role: '', active: false };
  userSubFA$ = new BehaviorSubject<ResponseUserModel>(this.userFA);




  loggedInSub$ = new BehaviorSubject<boolean>(false);
  currentUserIdSub = new BehaviorSubject<string>('');

  changePassword(oldPassword: string, new_password: string) {
    let params = new HttpParams();
    params = params.append('old_password', oldPassword)
    params = params.append('new_password', new_password)

    let headers = this.getHeader();

    this.http.put<{ message: string }>(`${environment.fastApiMainUrl}/users/me/change-password/`, {},
      { params: params, headers: headers }).subscribe({
        next: res => {
          console.log(res.message);
          this.handleMsgService.successMessage("Your password is changed successfully", "Password Changed")
          setTimeout(() => {
            this.router.navigate(['user'])
          }, 500)

        },
        error: err => {
          console.log(err);

        }
      })
  }


  signOutInFA() {
    this.loggedInSub$.next(false);
    this.userSubFA$.next(this.userFA)
    localStorage.removeItem('token');
    this.router.navigate([''])


  }


  isAuthenticated() {
    return this.userSubFA$.getValue().role == 'user';
  }

  isEmployerLoggedIn() {
    return this.userSubFA$.getValue().role == 'employer';
  }

  /// For FastApi Login

  signInFA(username: string, password: string) {
    if (!username) {
      console.warn("username can't find");
      return
    }


    const formData = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password)
      .set('scope', '')
      .set('client_id', '')
      .set('client_secret', '');
    console.log(username, password, formData);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post<TokenResponse>(`${environment.fastApiMainUrl}/token`, formData.toString(), { headers })
      .subscribe({
        next: res => {
          this.storeTokenInLs(res.access_token);
          this.getCurrentUser(res);
          this.loggedInSub$.next(true);
          console.log(Role.EMPLOYER, Role.USER, this.userSubFA$.getValue());

          setTimeout(() => {
            this.handleMsgService.successMessage("You successfully logged in", "Login Successful")
            if (this.userSubFA$.getValue().role == 'user') {
              console.log("user");
              this.router.navigate(['user']);
            }
            else if (this.userSubFA$.getValue().role == 'employer') {
              console.log("success");

              setTimeout(() => {
                this.router.navigate(['employer', 'profile'])
              }, 1000);
            }
          }, 1000)
        },
        error: err => {
          this.handleMsgService.errorMessage("Your username or email invalid", "Login Failed")
        }
      });
  }

  signUpInFA(data: CreateUserModel) {
    console.log(data);


    return this.http.post<ResponseUserModel>(`${environment.fastApiMainUrl}/users`, data)
  }

  autoLoginInFA() {
    let token = this.getTokenInLs();
    if (token) {
      let tokenResponse: TokenResponse = { access_token: token, token_type: "Bearer" }
      this.getCurrentUser(tokenResponse);
    }
  }

  getCurrentUser(headerInfo: TokenResponse) {
    const headers = new HttpHeaders({
      'Authorization': `${headerInfo.token_type} ${headerInfo.access_token}`
    })
    this.http.get<ResponseUserModel>(`${environment.fastApiMainUrl}/users/me`, { headers: headers }).subscribe({
      next: res => {
        console.log(res);
        this.userSubFA$.next(res);
        this.currentUserIdSub.next(res.id);
        this.loggedInSub$.next(true)
        return res;
      },
      error: _err => {
        console.log("failed man you");

        return false;
      }
    })
  }

  storeTokenInLs(token: string) {
    localStorage.setItem('token', JSON.stringify(token))
  }

  getTokenInLs() {
    let localRes = localStorage.getItem('token')
    if (!localRes) {
      console.warn("You are not authenticated yet");
      return;
    }
    const token: string = JSON.parse(localRes)
    return token
  }

  getHeader() {
    let token = this.getTokenInLs()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return headers
  }

  isEmployerAuthenticated() {
    let token = this.getTokenInLs()
    if (token) {
      const myObj: TokenResponse = { access_token: token, token_type: "Bearer" }
      this.getCurrentUser(myObj)
    }
  }
}



