import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitApplicationComponent } from './submit-application.component';

describe('SubmitApplicationComponent', () => {
  let component: SubmitApplicationComponent;
  let fixture: ComponentFixture<SubmitApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitApplicationComponent]
    });
    fixture = TestBed.createComponent(SubmitApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
