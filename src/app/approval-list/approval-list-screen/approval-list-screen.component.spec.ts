import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalListScreenComponent } from './approval-list-screen.component';

describe('ApprovalListScreenComponent', () => {
  let component: ApprovalListScreenComponent;
  let fixture: ComponentFixture<ApprovalListScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalListScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
