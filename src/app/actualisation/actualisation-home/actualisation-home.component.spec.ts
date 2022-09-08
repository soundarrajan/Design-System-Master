import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualisationHomeComponent } from './actualisation-home.component';

describe('ActualisationHomeComponent', () => {
  let component: ActualisationHomeComponent;
  let fixture: ComponentFixture<ActualisationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualisationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualisationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
