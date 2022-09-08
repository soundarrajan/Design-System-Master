import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelActualisationScreenComponent } from './fuel-actualisation-screen.component';

describe('FuelActualisationScreenComponent', () => {
  let component: FuelActualisationScreenComponent;
  let fixture: ComponentFixture<FuelActualisationScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelActualisationScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelActualisationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
