import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMsgEmployerComponent } from './send-msg-employer.component';

describe('SendMsgEmployerComponent', () => {
  let component: SendMsgEmployerComponent;
  let fixture: ComponentFixture<SendMsgEmployerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendMsgEmployerComponent]
    });
    fixture = TestBed.createComponent(SendMsgEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
