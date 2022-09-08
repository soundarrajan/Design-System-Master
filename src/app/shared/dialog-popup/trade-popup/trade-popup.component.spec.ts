import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradePopupComponent } from './trade-popup.component';

describe('TradePopupComponent', () => {
  let component: TradePopupComponent;
  let fixture: ComponentFixture<TradePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
