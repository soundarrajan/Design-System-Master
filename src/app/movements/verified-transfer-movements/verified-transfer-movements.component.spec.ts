import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedTransferMovementsComponent } from './verified-transfer-movements.component';

describe('VerifiedTransferMovementsComponent', () => {
  let component: VerifiedTransferMovementsComponent;
  let fixture: ComponentFixture<VerifiedTransferMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedTransferMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedTransferMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
