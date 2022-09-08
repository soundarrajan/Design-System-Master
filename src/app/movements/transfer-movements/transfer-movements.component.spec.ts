import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferMovementsComponent } from './transfer-movements.component';

describe('TransferMovementsComponent', () => {
  let component: TransferMovementsComponent;
  let fixture: ComponentFixture<TransferMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
