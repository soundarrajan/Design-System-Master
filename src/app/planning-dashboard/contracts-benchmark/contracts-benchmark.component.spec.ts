import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsBenchmarkComponent } from './contracts-benchmark.component';

describe('ContractsBenchmarkComponent', () => {
  let component: ContractsBenchmarkComponent;
  let fixture: ComponentFixture<ContractsBenchmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsBenchmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsBenchmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
