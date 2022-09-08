import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipDeleteprefComponent } from './ship-deletepref.component';

describe('ShipDeleteprefComponent', () => {
  let component: ShipDeleteprefComponent;
  let fixture: ComponentFixture<ShipDeleteprefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipDeleteprefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipDeleteprefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
