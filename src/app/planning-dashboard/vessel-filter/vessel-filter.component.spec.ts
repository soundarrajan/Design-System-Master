import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselFilterComponent } from './vessel-filter.component';

describe('VesselFilterComponent', () => {
  let component: VesselFilterComponent;
  let fixture: ComponentFixture<VesselFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VesselFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
