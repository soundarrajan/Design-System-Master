import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsSummaryComponent } from './ops-summary.component';

describe('OpsSummaryComponent', () => {
  let component: OpsSummaryComponent;
  let fixture: ComponentFixture<OpsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
