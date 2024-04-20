import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HandleMessageService {

  common_toast_style = {
    closeButton: true,
    positionClass: 'toast-top-center'
  }

  constructor(private toaster:ToastrService) { }

  successMessage(message:string, title:string){
    this.toaster.success(message, title, this.common_toast_style)
  }

  warningMessage(message:string, title:string){
    this.toaster.warning(message, title, this.common_toast_style);
  }
  
  errorMessage(message:string, title:string){
    this.toaster.error(message, title, this.common_toast_style);
  }
}
