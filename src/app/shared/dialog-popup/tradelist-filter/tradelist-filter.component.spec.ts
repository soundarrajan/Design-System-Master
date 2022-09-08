import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradelistFilterComponent } from './tradelist-filter.component';

describe('TradelistFilterComponent', () => {
  let component: TradelistFilterComponent;
  let fixture: ComponentFixture<TradelistFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradelistFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradelistFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
