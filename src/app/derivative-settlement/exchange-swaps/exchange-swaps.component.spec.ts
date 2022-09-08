import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeSwapsComponent } from './exchange-swaps.component';

describe('ExchangeSwapsComponent', () => {
  let component: ExchangeSwapsComponent;
  let fixture: ComponentFixture<ExchangeSwapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeSwapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeSwapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
