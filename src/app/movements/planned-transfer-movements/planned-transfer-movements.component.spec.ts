import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedTransferMovementsComponent } from './planned-transfer-movements.component';

describe('PlannedTransferMovementsComponent', () => {
  let component: PlannedTransferMovementsComponent;
  let fixture: ComponentFixture<PlannedTransferMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedTransferMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedTransferMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
