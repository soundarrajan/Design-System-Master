import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOptionsTradeComponent } from './new-options-trade.component';

describe('NewOptionsTradeComponent', () => {
  let component: NewOptionsTradeComponent;
  let fixture: ComponentFixture<NewOptionsTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOptionsTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOptionsTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
