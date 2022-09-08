import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationHoverComponent } from './location-hover.component';

describe('LocationHoverComponent', () => {
  let component: LocationHoverComponent;
  let fixture: ComponentFixture<LocationHoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationHoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
