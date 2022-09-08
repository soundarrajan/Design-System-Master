import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineScheduleComponent } from './pipeline-schedule.component';

describe('PipelineScheduleComponent', () => {
  let component: PipelineScheduleComponent;
  let fixture: ComponentFixture<PipelineScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
