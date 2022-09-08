import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EomclosureComponent } from './eomclosure.component';

describe('EomclosureComponent', () => {
  let component: EomclosureComponent;
  let fixture: ComponentFixture<EomclosureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EomclosureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EomclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
