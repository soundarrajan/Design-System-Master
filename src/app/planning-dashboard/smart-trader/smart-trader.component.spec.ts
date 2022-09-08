import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTraderComponent } from './smart-trader.component';

describe('SmartTraderComponent', () => {
  let component: SmartTraderComponent;
  let fixture: ComponentFixture<SmartTraderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTraderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
