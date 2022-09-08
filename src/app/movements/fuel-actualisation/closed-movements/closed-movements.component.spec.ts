import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedMovementsComponent } from './closed-movements.component';

describe('ClosedMovementsComponent', () => {
  let component: ClosedMovementsComponent;
  let fixture: ComponentFixture<ClosedMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
