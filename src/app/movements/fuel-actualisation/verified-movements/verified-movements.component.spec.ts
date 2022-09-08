import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedMovementsComponent } from './verified-movements.component';

describe('VerifiedMovementsComponent', () => {
  let component: VerifiedMovementsComponent;
  let fixture: ComponentFixture<VerifiedMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
