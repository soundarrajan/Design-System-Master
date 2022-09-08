import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryMovementComponent } from './add-delivery-movement.component';

describe('AddDeliveryMovementComponent', () => {
  let component: AddDeliveryMovementComponent;
  let fixture: ComponentFixture<AddDeliveryMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeliveryMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeliveryMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
