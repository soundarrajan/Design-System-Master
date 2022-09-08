import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRadioComponent } from './select-radio.component';

describe('SelectRadioComponent', () => {
  let component: SelectRadioComponent;
  let fixture: ComponentFixture<SelectRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
