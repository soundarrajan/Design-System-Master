import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkFilterComponent } from './dark-filter.component';

describe('DarkFilterComponent', () => {
  let component: DarkFilterComponent;
  let fixture: ComponentFixture<DarkFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarkFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
