import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackSchedulingHomeComponent } from './rack-scheduling-home.component';

describe('RackSchedulingHomeComponent', () => {
  let component: RackSchedulingHomeComponent;
  let fixture: ComponentFixture<RackSchedulingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackSchedulingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackSchedulingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
