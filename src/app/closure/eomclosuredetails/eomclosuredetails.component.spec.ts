import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EomclosuredetailsComponent } from './eomclosuredetails.component';

describe('EomclosuredetailsComponent', () => {
  let component: EomclosuredetailsComponent;
  let fixture: ComponentFixture<EomclosuredetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EomclosuredetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EomclosuredetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
