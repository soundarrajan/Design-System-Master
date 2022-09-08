import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Newheaderv2Component } from './newheaderv2.component';

describe('Newheaderv2Component', () => {
  let component: Newheaderv2Component;
  let fixture: ComponentFixture<Newheaderv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Newheaderv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Newheaderv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
