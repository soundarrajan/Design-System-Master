import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlreconHomeComponent } from './blrecon-home.component';

describe('BlreconHomeComponent', () => {
  let component: BlreconHomeComponent;
  let fixture: ComponentFixture<BlreconHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlreconHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlreconHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
