import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostReconciliationComponent } from './cost-reconciliation.component';

describe('CostReconciliationComponent', () => {
  let component: CostReconciliationComponent;
  let fixture: ComponentFixture<CostReconciliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostReconciliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
