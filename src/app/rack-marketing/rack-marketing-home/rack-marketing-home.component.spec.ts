import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackMarketingHomeComponent } from './rack-marketing-home.component';

describe('RackMarketingHomeComponent', () => {
  let component: RackMarketingHomeComponent;
  let fixture: ComponentFixture<RackMarketingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackMarketingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackMarketingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
