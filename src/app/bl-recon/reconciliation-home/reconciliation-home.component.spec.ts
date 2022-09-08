import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { reconciliationHomeComponent } from './reconciliation-home.component';

describe('reconciliationHomeComponent', () => {
  let component: reconciliationHomeComponent;
  let fixture: ComponentFixture<reconciliationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ reconciliationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(reconciliationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
