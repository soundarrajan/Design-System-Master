import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturesSettlementHomeComponent } from './futures-settlement-home.component';

describe('FuturesSettlementHomeComponent', () => {
  let component: FuturesSettlementHomeComponent;
  let fixture: ComponentFixture<FuturesSettlementHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuturesSettlementHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuturesSettlementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
