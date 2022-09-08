import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicBadgeComponent } from './dynamic-badge.component';

describe('DynamicBadgeComponent', () => {
  let component: DynamicBadgeComponent;
  let fixture: ComponentFixture<DynamicBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
