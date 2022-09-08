import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedOtherMovementsComponent } from './closed-other-movements.component';

describe('ClosedOtherMovementsComponent', () => {
  let component: ClosedOtherMovementsComponent;
  let fixture: ComponentFixture<ClosedOtherMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedOtherMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedOtherMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
