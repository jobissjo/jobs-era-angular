import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-personal',
  templateUrl: './update-personal.component.html',
  styleUrls: ['./update-personal.component.scss']
})
export class UpdatePersonalComponent {

  @Input() personalInformation!:FormGroup;
  @Output() nextTabEvent = new EventEmitter<void>();

  
  nextTab(){
    this.nextTabEvent.emit()
  }
}
