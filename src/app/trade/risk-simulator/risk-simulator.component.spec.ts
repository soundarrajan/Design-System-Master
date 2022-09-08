import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskSimulatorComponent } from './risk-simulator.component';

describe('RiskSimulatorComponent', () => {
  let component: RiskSimulatorComponent;
  let fixture: ComponentFixture<RiskSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
