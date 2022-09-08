import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankSummaryComponent } from './tank-summary.component';

describe('TankSummaryComponent', () => {
  let component: TankSummaryComponent;
  let fixture: ComponentFixture<TankSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TankSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TankSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
