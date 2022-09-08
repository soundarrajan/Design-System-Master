import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedListComponent } from './matched-list.component';

describe('MatchedListComponent', () => {
  let component: MatchedListComponent;
  let fixture: ComponentFixture<MatchedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
