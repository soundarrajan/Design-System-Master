import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackSchedulingComponent } from './rack-scheduling.component';

describe('RackSchedulingComponent', () => {
  let component: RackSchedulingComponent;
  let fixture: ComponentFixture<RackSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
