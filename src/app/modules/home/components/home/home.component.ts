import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent {
  
  router = inject(Router);
  ngOnInit(){

    console.log("Hello this is from home component");
    
    
  }
}
