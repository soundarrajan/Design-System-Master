import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUpdatePopupComponent } from './bulk-update-popup.component';

describe('BulkUpdatePopupComponent', () => {
  let component: BulkUpdatePopupComponent;
  let fixture: ComponentFixture<BulkUpdatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkUpdatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUpdatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
