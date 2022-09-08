import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EompopupComponent } from './eompopup.component';

describe('EompopupComponent', () => {
  let component: EompopupComponent;
  let fixture: ComponentFixture<EompopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EompopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EompopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
