import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EomlistdetailsComponent } from './eomlistdetails.component';

describe('EomlistdetailsComponent', () => {
  let component: EomlistdetailsComponent;
  let fixture: ComponentFixture<EomlistdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EomlistdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EomlistdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
