import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlreconUnmatchedListComponent } from './blrecon-unmatched-list.component';

describe('BlreconUnmatchedListComponent', () => {
  let component: BlreconUnmatchedListComponent;
  let fixture: ComponentFixture<BlreconUnmatchedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlreconUnmatchedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlreconUnmatchedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
