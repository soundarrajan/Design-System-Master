import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { reconciliationPopupComponent } from './reconciliation-popup.component';

describe('reconciliationPopupComponent', () => {
  let component: reconciliationPopupComponent;
  let fixture: ComponentFixture<reconciliationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ reconciliationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(reconciliationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
