import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackMatchedListComponent } from './rack-matched-list.component';

describe('RackMatchedListComponent', () => {
  let component: RackMatchedListComponent;
  let fixture: ComponentFixture<RackMatchedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackMatchedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackMatchedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
