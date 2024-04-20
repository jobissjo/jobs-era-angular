import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss',
   './../../commonStyle/employer-common.styles.scss']
})
export class AdditionalInfoComponent {
  @Input() additionalInformation!:FormGroup;
  @Output() previousEmit:EventEmitter<void> = new EventEmitter<void>();

  
  goToPrev(){
    this.previousEmit.emit()
  }
  platforms:{value:string, viewValue:string}[]= [
    {value:'youtube', viewValue: "YouTube"},
    {value:'facebook', viewValue: 'Facebook'},
    {value:'googleSearch', viewValue:'Google Search'},
    {value:'other', viewValue: 'Other'}
  ]

  submitEmit(){
    
  }
}
