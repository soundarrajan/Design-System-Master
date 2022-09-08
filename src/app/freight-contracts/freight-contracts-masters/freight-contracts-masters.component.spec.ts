import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightContractsMastersComponent } from './freight-contracts-masters.component';

describe('FreightContractsMastersComponent', () => {
  let component: FreightContractsMastersComponent;
  let fixture: ComponentFixture<FreightContractsMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightContractsMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightContractsMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
