import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbReportingComponent } from './arb-reporting.component';

describe('ArbReportingComponent', () => {
  let component: ArbReportingComponent;
  let fixture: ComponentFixture<ArbReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
