import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkActualisePopupComponent } from './bulk-actualise-popup.component';

describe('BulkActualisePopupComponent', () => {
  let component: BulkActualisePopupComponent;
  let fixture: ComponentFixture<BulkActualisePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkActualisePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkActualisePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
