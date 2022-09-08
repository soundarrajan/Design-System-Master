import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightContractsHomeComponent } from './freight-contracts-home.component';

describe('FreightContractsHomeComponent', () => {
  let component: FreightContractsHomeComponent;
  let fixture: ComponentFixture<FreightContractsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightContractsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightContractsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
