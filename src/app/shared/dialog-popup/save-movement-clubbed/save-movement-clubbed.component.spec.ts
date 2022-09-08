import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMovementClubbedComponent } from './save-movement-clubbed.component';

describe('SaveMovementClubbedComponent', () => {
  let component: SaveMovementClubbedComponent;
  let fixture: ComponentFixture<SaveMovementClubbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveMovementClubbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMovementClubbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
