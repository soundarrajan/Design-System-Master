import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherMovementComponent } from './add-other-movement.component';

describe('AddOtherMovementComponent', () => {
  let component: AddOtherMovementComponent;
  let fixture: ComponentFixture<AddOtherMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOtherMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOtherMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
