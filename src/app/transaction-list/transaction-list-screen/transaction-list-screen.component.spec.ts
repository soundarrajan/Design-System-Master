import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionListScreenComponent } from './transaction-list-screen.component';

describe('TransactionListScreenComponent', () => {
  let component: TransactionListScreenComponent;
  let fixture: ComponentFixture<TransactionListScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionListScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
