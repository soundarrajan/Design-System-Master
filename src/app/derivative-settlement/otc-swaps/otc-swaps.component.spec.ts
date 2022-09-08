import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcSwapsComponent } from './otc-swaps.component';

describe('OtcSwapsComponent', () => {
  let component: OtcSwapsComponent;
  let fixture: ComponentFixture<OtcSwapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtcSwapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtcSwapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
