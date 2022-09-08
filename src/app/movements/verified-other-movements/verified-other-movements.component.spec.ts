import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedOtherMovementsComponent } from './verified-other-movements.component';

describe('VerifiedOtherMovementsComponent', () => {
  let component: VerifiedOtherMovementsComponent;
  let fixture: ComponentFixture<VerifiedOtherMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedOtherMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedOtherMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
