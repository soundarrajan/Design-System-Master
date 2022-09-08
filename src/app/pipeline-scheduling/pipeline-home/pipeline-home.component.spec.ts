import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineHomeComponent } from './pipeline-home.component';

describe('PipelineHomeComponent', () => {
  let component: PipelineHomeComponent;
  let fixture: ComponentFixture<PipelineHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
