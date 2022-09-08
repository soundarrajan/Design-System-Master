import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesseldetailspopupComponent } from './vesseldetailspopup.component';

describe('VesseldetailspopupComponent', () => {
  let component: VesseldetailspopupComponent;
  let fixture: ComponentFixture<VesseldetailspopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesseldetailspopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VesseldetailspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
