import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vessel2ScheduleComponent } from './vessel2-schedule.component';

describe('Vessel2ScheduleComponent', () => {
  let component: Vessel2ScheduleComponent;
  let fixture: ComponentFixture<Vessel2ScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vessel2ScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vessel2ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
