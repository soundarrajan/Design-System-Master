import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSummaryNestedComponent } from './invoice-summary-nested.component';

describe('InvoiceSummaryNestedComponent', () => {
  let component: InvoiceSummaryNestedComponent;
  let fixture: ComponentFixture<InvoiceSummaryNestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSummaryNestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSummaryNestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
