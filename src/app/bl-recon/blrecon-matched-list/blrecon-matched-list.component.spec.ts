import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlreconMatchedListComponent } from './blrecon-matched-list.component';

describe('BlreconMatchedListComponent', () => {
  let component: BlreconMatchedListComponent;
  let fixture: ComponentFixture<BlreconMatchedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlreconMatchedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlreconMatchedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
