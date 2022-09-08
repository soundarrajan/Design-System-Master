import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineFilterComponent } from './pipeline-filter.component';

describe('PipelineFilterComponent', () => {
  let component: PipelineFilterComponent;
  let fixture: ComponentFixture<PipelineFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
