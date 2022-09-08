import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiBunkeringRangeComponent } from './ai-bunkering-range.component';

describe('AiBunkeringRangeComponent', () => {
  let component: AiBunkeringRangeComponent;
  let fixture: ComponentFixture<AiBunkeringRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiBunkeringRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiBunkeringRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
