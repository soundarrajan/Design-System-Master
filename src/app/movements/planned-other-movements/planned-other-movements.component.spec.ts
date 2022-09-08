import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedOtherMovementsComponent } from './planned-other-movements.component';

describe('PlannedOtherMovementsComponent', () => {
  let component: PlannedOtherMovementsComponent;
  let fixture: ComponentFixture<PlannedOtherMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedOtherMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedOtherMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
