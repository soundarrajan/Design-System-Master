import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselDestinationComponent } from './vessel-destination.component';

describe('VesselDestinationComponent', () => {
  let component: VesselDestinationComponent;
  let fixture: ComponentFixture<VesselDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselDestinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VesselDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
