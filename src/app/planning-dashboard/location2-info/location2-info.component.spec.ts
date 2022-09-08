import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Location2InfoComponent } from './location2-info.component';

describe('Location2InfoComponent', () => {
  let component: Location2InfoComponent;
  let fixture: ComponentFixture<Location2InfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Location2InfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Location2InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
