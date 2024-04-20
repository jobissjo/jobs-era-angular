import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss',
    './../../commonStyle/employer-common.styles.scss']
})
export class CompanyInfoComponent {
  @Input() companyInformation!: FormGroup;
  @Output() prevPageEmit: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextPageEmit: EventEmitter<void> = new EventEmitter<void>();
  address!: FormGroup;
  ngOnInit() {
    this.address = <FormGroup>this.companyInformation.get('address')
  }

  clickGoToPrev(){
    this.prevPageEmit.emit()
  }
  clickGoToNext(){
    this.nextPageEmit.emit()
  }
}
