import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewoptionauditlogComponent } from './newoptionauditlog.component';

describe('NewoptionauditlogComponent', () => {
  let component: NewoptionauditlogComponent;
  let fixture: ComponentFixture<NewoptionauditlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewoptionauditlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewoptionauditlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
