import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOptionEmaillogComponent } from './new-option-emaillog.component';

describe('NewOptionEmaillogComponent', () => {
  let component: NewOptionEmaillogComponent;
  let fixture: ComponentFixture<NewOptionEmaillogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOptionEmaillogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOptionEmaillogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
