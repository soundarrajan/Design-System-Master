import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiptechDeliveryComponent } from './shiptech-delivery.component';

describe('ShiptechDeliveryComponent', () => {
  let component: ShiptechDeliveryComponent;
  let fixture: ComponentFixture<ShiptechDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiptechDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiptechDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
