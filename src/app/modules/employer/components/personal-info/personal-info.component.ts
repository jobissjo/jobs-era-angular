import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss',
  './../../commonStyle/employer-common.styles.scss']
})
export class PersonalInfoComponent {
  @Input() personalInformation!:FormGroup;
  @Output() nextTabEvent = new EventEmitter<void>();

  
  nextTab(){
    this.nextTabEvent.emit()
  }
  // ngOnInit(){
    
  // }

}
