import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedMovementsComponent } from './planned-movements.component';

describe('PlannedMovementsComponent', () => {
  let component: PlannedMovementsComponent;
  let fixture: ComponentFixture<PlannedMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
