import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeListHomeComponent } from './trade-list-home.component';

describe('TradeListHomeComponent', () => {
  let component: TradeListHomeComponent;
  let fixture: ComponentFixture<TradeListHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeListHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
