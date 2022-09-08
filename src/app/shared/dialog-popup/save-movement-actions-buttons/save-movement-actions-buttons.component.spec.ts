import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMovementActionsButtonsComponent } from './save-movement-actions-buttons.component';

describe('SaveMovementActionsButtonsComponent', () => {
  let component: SaveMovementActionsButtonsComponent;
  let fixture: ComponentFixture<SaveMovementActionsButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveMovementActionsButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMovementActionsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
