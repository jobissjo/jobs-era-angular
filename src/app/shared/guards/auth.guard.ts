import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { HandleMessageService } from "../service/handle-message.service";

export const canActivateLogin = () => {
    const authService = inject(AuthService);
    const handleMsgService = inject(HandleMessageService);
    const router = inject(Router);
    // without subscribe to get current val from behavior subject
    // console.log(authService.loggedInSub$.getValue());
    
    if (authService.isAuthenticated()) {
        return true;
    } else {
        router.navigate(['auth/sign-in']);
        handleMsgService.warningMessage("Access Denied to this page, login required for this page", "Login Required")
        return false;
    }
}

export const canActivateChildLogin = () => {
    return canActivateLogin()
}

export const canActivateEmployer = () => {
    const authService = inject(AuthService);
    const handleMsgService = inject(HandleMessageService);
    const router = inject(Router);

    if(authService.isEmployerLoggedIn()){
        return true;
    }else {
        router.navigate(['employer/login-employer']);
        handleMsgService.warningMessage("Access Denied to this page", "Employer Login Required")
        return false;
    }
}