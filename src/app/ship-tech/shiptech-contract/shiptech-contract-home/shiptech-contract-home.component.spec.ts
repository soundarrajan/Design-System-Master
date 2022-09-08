import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiptechContractHomeComponent } from './shiptech-contract-home.component';

describe('ShiptechContractHomeComponent', () => {
  let component: ShiptechContractHomeComponent;
  let fixture: ComponentFixture<ShiptechContractHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiptechContractHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiptechContractHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
