import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccrualComponent } from './accrual.component';

describe('AccrualComponent', () => {
  let component: AccrualComponent;
  let fixture: ComponentFixture<AccrualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccrualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccrualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
