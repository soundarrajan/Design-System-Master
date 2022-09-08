import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalTradeComponent } from './physical-trade.component';

describe('PhysicalTradeComponent', () => {
  let component: PhysicalTradeComponent;
  let fixture: ComponentFixture<PhysicalTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
