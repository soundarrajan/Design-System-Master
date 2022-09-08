import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vessel2DestinationComponent } from './vessel2-destination.component';

describe('Vessel2DestinationComponent', () => {
  let component: Vessel2DestinationComponent;
  let fixture: ComponentFixture<Vessel2DestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vessel2DestinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vessel2DestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
