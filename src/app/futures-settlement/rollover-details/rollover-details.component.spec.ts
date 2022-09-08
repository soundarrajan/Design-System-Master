import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolloverDetailsComponent } from './rollover-details.component';

describe('RolloverDetailsComponent', () => {
  let component: RolloverDetailsComponent;
  let fixture: ComponentFixture<RolloverDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolloverDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolloverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
