import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewRfqPopupComponent } from './preview-rfq-popup.component';

describe('PreviewRfqPopupComponent', () => {
  let component: PreviewRfqPopupComponent;
  let fixture: ComponentFixture<PreviewRfqPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewRfqPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewRfqPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
