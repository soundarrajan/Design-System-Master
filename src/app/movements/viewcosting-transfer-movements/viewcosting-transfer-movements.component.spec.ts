import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcostingTransferMovementsComponent } from './viewcosting-transfer-movements.component';

describe('ViewcostingTransferMovementsComponent', () => {
  let component: ViewcostingTransferMovementsComponent;
  let fixture: ComponentFixture<ViewcostingTransferMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcostingTransferMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcostingTransferMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
