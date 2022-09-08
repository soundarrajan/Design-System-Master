import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechAvailableFiltersComponent } from './tech-available-filters.component';

describe('TechAvailableFiltersComponent', () => {
  let component: TechAvailableFiltersComponent;
  let fixture: ComponentFixture<TechAvailableFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechAvailableFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechAvailableFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
