import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPopupComponent } from './expansion-popup.component';

describe('ExpansionPopupComponent', () => {
  let component: ExpansionPopupComponent;
  let fixture: ComponentFixture<ExpansionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpansionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
