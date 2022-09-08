import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselAlertsComponent } from './vessel-alerts.component';

describe('VesselAlertsComponent', () => {
  let component: VesselAlertsComponent;
  let fixture: ComponentFixture<VesselAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VesselAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
