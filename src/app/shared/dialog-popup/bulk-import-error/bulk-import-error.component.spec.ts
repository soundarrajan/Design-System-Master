import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkImportErrorComponent } from './bulk-import-error.component';

describe('BulkImportErrorComponent', () => {
  let component: BulkImportErrorComponent;
  let fixture: ComponentFixture<BulkImportErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkImportErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkImportErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
