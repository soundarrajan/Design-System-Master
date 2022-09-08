import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipTechHomeScreenComponent } from './ship-tech-home-screen.component';

describe('ShipTechHomeScreenComponent', () => {
  let component: ShipTechHomeScreenComponent;
  let fixture: ComponentFixture<ShipTechHomeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipTechHomeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipTechHomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
