import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddMovementComponent } from './new-add-movement.component';

describe('NewAddMovementComponent', () => {
  let component: NewAddMovementComponent;
  let fixture: ComponentFixture<NewAddMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAddMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAddMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
