import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedInvoicesComponent } from './related-invoices.component';

describe('RelatedInvoicesComponent', () => {
  let component: RelatedInvoicesComponent;
  let fixture: ComponentFixture<RelatedInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
