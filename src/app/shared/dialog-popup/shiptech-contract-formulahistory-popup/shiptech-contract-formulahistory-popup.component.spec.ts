import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiptechContractFormulahistoryPopupComponent } from './shiptech-contract-formulahistory-popup.component';

describe('ShiptechContractFormulahistoryPopupComponent', () => {
  let component: ShiptechContractFormulahistoryPopupComponent;
  let fixture: ComponentFixture<ShiptechContractFormulahistoryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiptechContractFormulahistoryPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiptechContractFormulahistoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
