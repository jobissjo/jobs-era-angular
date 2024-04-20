import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployerAccountComponent } from './create-employer-account.component';

describe('CreateEmployerAccountComponent', () => {
  let component: CreateEmployerAccountComponent;
  let fixture: ComponentFixture<CreateEmployerAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEmployerAccountComponent]
    });
    fixture = TestBed.createComponent(CreateEmployerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
