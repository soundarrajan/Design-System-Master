import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortHover2Component } from './port-hover2.component';

describe('PortHover2Component', () => {
  let component: PortHover2Component;
  let fixture: ComponentFixture<PortHover2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortHover2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortHover2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
