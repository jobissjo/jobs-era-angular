import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerNotificationComponent } from './employer-notification.component';

describe('EmployerNotificationComponent', () => {
  let component: EmployerNotificationComponent;
  let fixture: ComponentFixture<EmployerNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerNotificationComponent]
    });
    fixture = TestBed.createComponent(EmployerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
