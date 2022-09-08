import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementScreenComponent } from './settlement-screen.component';

describe('SettlementScreenComponent', () => {
  let component: SettlementScreenComponent;
  let fixture: ComponentFixture<SettlementScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
