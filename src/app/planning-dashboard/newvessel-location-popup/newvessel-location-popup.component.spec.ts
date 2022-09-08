import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewvesselLocationPopupComponent } from './newvessel-location-popup.component';

describe('NewvesselLocationPopupComponent', () => {
  let component: NewvesselLocationPopupComponent;
  let fixture: ComponentFixture<NewvesselLocationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewvesselLocationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewvesselLocationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
