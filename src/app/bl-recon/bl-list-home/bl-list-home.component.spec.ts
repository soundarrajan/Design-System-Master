import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlListHomeComponent } from './bl-list-home.component';

describe('BlListHomeComponent', () => {
  let component: BlListHomeComponent;
  let fixture: ComponentFixture<BlListHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlListHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
