import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTraderMapPanelComponent } from './smart-trader-map-panel.component';

describe('SmartTraderMapPanelComponent', () => {
  let component: SmartTraderMapPanelComponent;
  let fixture: ComponentFixture<SmartTraderMapPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTraderMapPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTraderMapPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
