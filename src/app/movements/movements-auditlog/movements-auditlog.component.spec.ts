import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsAuditlogComponent } from './movements-auditlog.component';

describe('MovementsAuditlogComponent', () => {
  let component: MovementsAuditlogComponent;
  let fixture: ComponentFixture<MovementsAuditlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsAuditlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsAuditlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
