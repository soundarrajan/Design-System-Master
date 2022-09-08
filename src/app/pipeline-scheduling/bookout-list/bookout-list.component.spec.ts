import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookoutListComponent } from './bookout-list.component';

describe('BookoutListComponent', () => {
  let component: BookoutListComponent;
  let fixture: ComponentFixture<BookoutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookoutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
