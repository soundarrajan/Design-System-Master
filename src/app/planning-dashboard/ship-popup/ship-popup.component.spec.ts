import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipPopupComponent } from './ship-popup.component';

describe('ShipPopupComponent', () => {
  let component: ShipPopupComponent;
  let fixture: ComponentFixture<ShipPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
