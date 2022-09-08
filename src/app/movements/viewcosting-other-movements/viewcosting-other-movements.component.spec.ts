import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcostingOtherMovementsComponent } from './viewcosting-other-movements.component';

describe('ViewcostingOtherMovementsComponent', () => {
  let component: ViewcostingOtherMovementsComponent;
  let fixture: ComponentFixture<ViewcostingOtherMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcostingOtherMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcostingOtherMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
