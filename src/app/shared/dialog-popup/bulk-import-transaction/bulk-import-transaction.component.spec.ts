import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkImportTransactionComponent } from './bulk-import-transaction.component';

describe('BulkImportTransactionComponent', () => {
  let component: BulkImportTransactionComponent;
  let fixture: ComponentFixture<BulkImportTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkImportTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkImportTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
