import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSummaryPopupComponent } from './invoice-summary-popup.component';

describe('InvoiceSummaryPopupComponent', () => {
  let component: InvoiceSummaryPopupComponent;
  let fixture: ComponentFixture<InvoiceSummaryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSummaryPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSummaryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
