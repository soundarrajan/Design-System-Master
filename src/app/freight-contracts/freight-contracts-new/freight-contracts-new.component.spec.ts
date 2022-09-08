import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightContractsNewComponent } from './freight-contracts-new.component';

describe('FreightContractsNewComponent', () => {
  let component: FreightContractsNewComponent;
  let fixture: ComponentFixture<FreightContractsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightContractsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightContractsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
