import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryConfirmationComponent } from './delivery-confirmation.component';

describe('DeliveryConfirmationComponent', () => {
  let component: DeliveryConfirmationComponent;
  let fixture: ComponentFixture<DeliveryConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
