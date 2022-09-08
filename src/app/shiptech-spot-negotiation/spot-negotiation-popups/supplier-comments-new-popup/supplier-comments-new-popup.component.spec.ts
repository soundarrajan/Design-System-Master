import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCommentsNewPopupComponent } from './supplier-comments-new-popup.component';

describe('SupplierCommentsNewPopupComponent', () => {
  let component: SupplierCommentsNewPopupComponent;
  let fixture: ComponentFixture<SupplierCommentsNewPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierCommentsNewPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCommentsNewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
