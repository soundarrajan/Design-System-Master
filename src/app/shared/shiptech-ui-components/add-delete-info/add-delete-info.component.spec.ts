import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeleteInfoComponent } from './add-delete-info.component';

describe('AddDeleteInfoComponent', () => {
  let component: AddDeleteInfoComponent;
  let fixture: ComponentFixture<AddDeleteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeleteInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeleteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
