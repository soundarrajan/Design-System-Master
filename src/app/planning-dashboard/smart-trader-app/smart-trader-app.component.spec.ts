import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTraderAppComponent } from './smart-trader-app.component';

describe('SmartTraderAppComponent', () => {
  let component: SmartTraderAppComponent;
  let fixture: ComponentFixture<SmartTraderAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTraderAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTraderAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
