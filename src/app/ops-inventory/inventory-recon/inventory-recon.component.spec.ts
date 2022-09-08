import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryReconComponent } from './inventory-recon.component';

describe('InventoryReconComponent', () => {
  let component: InventoryReconComponent;
  let fixture: ComponentFixture<InventoryReconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryReconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryReconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
