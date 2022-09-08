import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiptechContractPricingDetailsPopupComponent } from './shiptech-contract-pricing-details-popup.component';

describe('ShiptechContractPricingDetailsPopupComponent', () => {
  let component: ShiptechContractPricingDetailsPopupComponent;
  let fixture: ComponentFixture<ShiptechContractPricingDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiptechContractPricingDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiptechContractPricingDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
