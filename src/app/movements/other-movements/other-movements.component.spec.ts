import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherMovementsComponent } from './other-movements.component';

describe('OtherMovementsComponent', () => {
  let component: OtherMovementsComponent;
  let fixture: ComponentFixture<OtherMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
