import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditActualisationScreenComponent } from './credit-actualisation-screen.component';

describe('CreditActualisationScreenComponent', () => {
  let component: CreditActualisationScreenComponent;
  let fixture: ComponentFixture<CreditActualisationScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditActualisationScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditActualisationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
