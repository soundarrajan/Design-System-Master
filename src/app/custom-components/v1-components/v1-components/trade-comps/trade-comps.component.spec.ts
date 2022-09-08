import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCompsComponent } from './trade-comps.component';

describe('TradeCompsComponent', () => {
  let component: TradeCompsComponent;
  let fixture: ComponentFixture<TradeCompsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCompsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCompsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
