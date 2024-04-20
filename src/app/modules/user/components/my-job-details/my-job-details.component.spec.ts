import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJobDetailsComponent } from './my-job-details.component';

describe('MyJobDetailsComponent', () => {
  let component: MyJobDetailsComponent;
  let fixture: ComponentFixture<MyJobDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyJobDetailsComponent]
    });
    fixture = TestBed.createComponent(MyJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
