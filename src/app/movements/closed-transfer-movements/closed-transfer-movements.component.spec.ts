import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedTransferMovementsComponent } from './closed-transfer-movements.component';

describe('ClosedTransferMovementsComponent', () => {
  let component: ClosedTransferMovementsComponent;
  let fixture: ComponentFixture<ClosedTransferMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedTransferMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedTransferMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
