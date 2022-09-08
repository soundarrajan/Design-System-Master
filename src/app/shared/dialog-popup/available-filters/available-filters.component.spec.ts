import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableFiltersComponent } from './available-filters.component';

describe('AvailableFiltersComponent', () => {
  let component: AvailableFiltersComponent;
  let fixture: ComponentFixture<AvailableFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
