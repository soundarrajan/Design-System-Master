import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipPopupFullComponent } from './ship-popup-full.component';

describe('ShipPopupFullComponent', () => {
  let component: ShipPopupFullComponent;
  let fixture: ComponentFixture<ShipPopupFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipPopupFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipPopupFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
