import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMovementClubbedActionsButtonsComponent } from './save-movement-clubbed-actions-buttons.component';

describe('SaveMovementClubbedActionsButtonsComponent', () => {
  let component: SaveMovementClubbedActionsButtonsComponent;
  let fixture: ComponentFixture<SaveMovementClubbedActionsButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveMovementClubbedActionsButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMovementClubbedActionsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
