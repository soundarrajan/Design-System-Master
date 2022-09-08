import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipSaveprefComponent } from './ship-savepref.component';

describe('ShipSaveprefComponent', () => {
  let component: ShipSaveprefComponent;
  let fixture: ComponentFixture<ShipSaveprefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipSaveprefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipSaveprefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
